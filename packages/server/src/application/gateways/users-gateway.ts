export interface IUsersGateway {
    auth(userId: string, token: string): Promise<boolean>;
}
