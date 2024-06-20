import { Channel, Connection, connect, credentials } from "amqplib";
import { IQueue } from "@/interface-adapters/ports/queue";

export class RabbitMQAdapter implements IQueue {
	private conn: Connection;
    private channel: Channel;

	constructor () {}

	async connect(): Promise<void> {
		const options = {
			credentials: credentials.plain(process.env.RABBITMQ_USER, process.env.RABBITMQ_PASSWORD)
		};
        this.conn = await connect(process.env.RABBITMQ_URL, options);
        this.channel = await this.conn.createChannel();
	}

	async on(queueName: string, callback: Parameters<IQueue["on"]>[1]): Promise<void> {
		const channel = this.channel;
		await channel.assertQueue(queueName, { durable: true });
		channel.consume(queueName, async function (msg: any) {
			const input = JSON.parse(msg.content.toString());
			try {
				callback(input);
				channel.ack(msg);
			} catch (e: any) {
				// TODO: Talvez aqui seja interessante eu analisar o tipo de erro, se
				// 		 é um base error.. ou se n... e a partir disso decidir se tento
				//		 o retry ou n.

				// TODO: Além disso, refatorar o BaseError... remover aquele status como
				//		 number e passar a ser uma flag errorType: "validation" | "unautorized" ...
				// channel.nack(msg, false, true);
				console.log(e);
			}
		});
	}
}
