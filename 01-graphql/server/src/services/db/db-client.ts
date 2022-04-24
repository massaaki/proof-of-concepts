import { PrismaClient } from '@prisma/client';

export class DbClient {
	private static instance: PrismaClient = null;

	public static getInstance() {
		if (DbClient.instance === null) {
			DbClient.instance = new PrismaClient();
		}
		return DbClient.instance;
	}

	public static async connect() {
		if (DbClient.instance !== null) {
			await DbClient.instance.$connect();
		}
	}

	public static async disconnect() {
		if (DbClient.instance !== null) {
			await DbClient.instance.$disconnect();
		}
	}
}