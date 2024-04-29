// TODO: Quando eu introduzir a funcionalidade de notificações, pode ser interessante permitir
// 		 tanto o push-notifications quanto o email-notification. Daí talvez faça sentido eu mudar
//		 essa interface para algo mais genérico, e na infra ter os dois tipos de gatways. Talvez
//		 renomear aqui para "INotifierGateway"

export interface IEmailGateway {
	send(subject: string, message: string, to: string): Promise<string>;
	createTemplate(title: string, text: string): string;
}
