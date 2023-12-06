import express from "express";
import { Server } from "http";
import { json } from "body-parser";

import { logger } from "./helpers/logger";
import { environment } from "./environment";
import { routes } from "./routes";
import { DbConnection } from "./db-connection";

const { log, info, error } = logger;

const app = express();
let server: Server | null;

export async function shutDownSystem(code?: string): Promise<void> {
	log(`Server is Shutting down ${code ? `with code: code` : ''}`);

	const shutDownServer = (): Promise<void> => {
		return new Promise<void>((res) => {
			if (server) {
				server.close(() => res(undefined));
			} else {
				error("Express server is not initialized");
				res(undefined);
			}
		});
	};

	try {
		await shutDownServer();
		(await DbConnection.mongodb()).disconnect();
		await new DbConnection(false).shutDown();
	} catch (e) {
		error("Eror in shutting down the server: ", e);
	}
}

export async function startupSystem(isTest = false): Promise<void> {
	await DbConnection.mongodb(isTest);
	app.use(json());

	app.use("/", routes());

	process.on("SIGINT", shutDownSystem);
	process.on("SIGTERM", shutDownSystem);

	return new Promise<void>((res, rej) => {
		try {
			server = app.listen(environment.PORT, () => {
				info("Server is running at: ", environment.PORT);
				res(undefined);
			});
		} catch (e) {
			rej();
			error("Error in starting server: ", e);
		}
	});
}
