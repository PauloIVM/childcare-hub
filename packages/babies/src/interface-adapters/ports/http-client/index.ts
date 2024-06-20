export interface IHttpClient {
	get<T>(url: string): Promise<T>;
	post<T>(url: string, body: Record<string, any>): Promise<T>;
}
