export interface IQueue {
	connect(): Promise<void>;
	on(queue: string, callback: (message: Record<string, any>) => void): Promise<void>;
}
