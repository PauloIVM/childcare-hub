export interface IUsersGateway {
    getUserId(token: string): Promise<string>;
}
