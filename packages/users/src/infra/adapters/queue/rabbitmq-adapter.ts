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

	// TODO: Documentar no archtectural_decisions a minha convenção de nomes pra mensageria:
	// 		 - https://medium.com/@miralizoda.komron/naming-conventions-in-rabbitmq-84cc583e84f5

	// TODO: Talvez eu possa esconder a exchange se todas as notificações desse service forem
	//		 usar a exchange 'users.notifications'.
	async publish(exchange: string, routingKey: string, message: string): Promise<boolean> {
        return this.channel.publish(exchange, routingKey, Buffer.from(message));
	}
}
