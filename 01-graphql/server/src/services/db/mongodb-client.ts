import { PrismaClient } from '@prisma/client';

export class MongoDbClient {
	private static instance: PrismaClient = null;

	public static getInstance() {
		if (MongoDbClient.instance === null) {
			MongoDbClient.instance = new PrismaClient();
		}
		return MongoDbClient.instance;
	}

	public static async connect() {
		if (MongoDbClient.instance !== null) {
			await MongoDbClient.instance.$connect();
		}
	}

	public static async disconnect() {
		if (MongoDbClient.instance !== null) {
			await MongoDbClient.instance.$disconnect();
		}
	}
}