import { Message } from "amqplib";

export interface IQueue {
	connect(): Promise<void>;
	on(queue: string, callback: (message: Message) => void): Promise<void>;
	publish(exchange: string, routingKey: string, message: string): Promise<boolean>;
}
