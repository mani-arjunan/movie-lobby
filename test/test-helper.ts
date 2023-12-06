import mongoose from "mongoose";
import fetch from "node-fetch";
import { Movies } from "../src/schemas/movies";

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export async function deleteCollection() {
	await Movies.deleteMany();
}

export async function fetchHelper<T>(
	route: string,
	method: Method,
	headers = {},
	payload?: Record<string, unknown>,
	endpoint = "http://localhost:3000",
): Promise<{ status: number; data: T }> {
	const response = await fetch(`${endpoint}/${route}`, {
		method,
		headers: { ...headers },
		body: JSON.stringify(payload),
	});
	let data = await response.text();

	return {
		status: response.status,
		data,
	};
}
