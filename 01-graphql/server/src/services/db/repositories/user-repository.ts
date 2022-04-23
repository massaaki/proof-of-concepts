import { User } from "../../../interfaces/user";
import { MongoDbClient } from "../mongodb-client";

export class UserRepository {
	private client = MongoDbClient.getInstance();

	async findAll(): Promise<User[]> {
		const response = await this.client.user.findMany();
		if (!response)
			return null;
		
		const users: User[] = response.map(({ id, email, name }) => ({
			id,
			email,
			name
		}));
		
		return users;
	}

	
}