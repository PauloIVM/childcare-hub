import { IHttpClient } from "@/interface-adapters/ports/http-client";
import axios from "axios";

export class AxiosAdapter implements IHttpClient {
	async get<T>(url: string): Promise<T> {
		const response = await axios.get(url);
		return response.data;
	}

	async post<T>(url: string, body: Record<string, any>): Promise<T> {
		const response = await axios.post(url, body);
		return response.data;
	}
}
