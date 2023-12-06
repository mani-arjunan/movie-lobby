import mongoose from "mongoose";
import { environment } from "../environment";

export class DbConnection {
	private static _mongodb: typeof mongoose;
	private _isTest: boolean;

	constructor(isTest: boolean) {
		this._isTest = isTest;
	}

	async init(): Promise<typeof mongoose> {
		return await mongoose.connect(
			this._isTest ? environment.TEST_DATABASE_URL : environment.DATABASE_URL,
		);
	}

	async shutDown(): Promise<void> {
		await mongoose.disconnect();
	}

	public static async mongodb(isTest = false): Promise<typeof mongoose> {
		if (!this._mongodb) {
			this._mongodb = await new DbConnection(isTest).init();
		}

		return this._mongodb;
	}
}
