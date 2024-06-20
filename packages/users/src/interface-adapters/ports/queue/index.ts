export interface IQueue {
	connect(): Promise<void>;
	publish(exchange: string, routingKey: string, message: string): Promise<boolean>;
}
