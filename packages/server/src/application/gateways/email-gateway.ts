export interface IEmailGateway {
	send(subject: string, message: string, to: string): Promise<string>;
	createTemplate(title: string, text: string): string;
}
