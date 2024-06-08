import { Channel, Connection, connect } from "amqplib";
import { Queue } from "@/interface-adapters/ports/queue";

export default class RabbitMQAdapter implements Queue {
	private conn: Connection;
    private channel: Channel;

	constructor () {}

	async connect(): Promise<void> {
        // TODO: Puxar uri dos ENVs..
        this.conn = await connect("amqp://localhost");
        this.channel = await this.conn.createChannel();
	}

	async on(queueName: string, callback: Function): Promise<void> {
		const channel = await this.conn.createChannel();
		await channel.assertQueue(queueName, { durable: true });
		channel.consume(queueName, async function (msg: any) {
			const input = JSON.parse(msg.content.toString());
			try {
				await callback(input);
				channel.ack(msg);
			} catch (e: any) {
				console.log(e);
			}
		});
	}

	async publish(exchange: string, routingKey: string, message: string): Promise<boolean> {
        return this.channel.publish(exchange, routingKey, Buffer.from(message));
	}
}
