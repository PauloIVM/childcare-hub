export interface IServicesNotifierGateway {
    // TODO: Pensar em uma forma de autenticação? Talvez enviar o token do user-id? Pode ser um
    //       problema se expirar. Posso enviar um segundo param com uma chave a ser validada em
    //       cada listenner... só n sei mesmo se é necessário... pois em tese só vai ter conexão
    //       com o banco os meus serviços com uma senha pré-definida. Contudo, enviar uma chave a
    //       ser validada deixa explícito a nível de usecase a necessidade de autenticação, e evitaria
    //       se usar um usecase como esse indevidamente, em uma rota http, por exemplo... vazando
    //       o user-id, o q eu n quero. Ainda n sei...
	notifyUserCreated(userId: string): Promise<void>;
	notifyUserDeleted(userId: string): Promise<void>;
}
