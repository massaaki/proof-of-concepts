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

	async create({ email, name }: Omit<User, 'id'>): Promise<User> {
		const userExists = await this.client.user.findFirst({
			where: {
				email
			}
		});

		if (userExists) 
			return null;
		
		const newUser = await this.client.user.create({
			data: {
				email,
				name
			}
		});

		if (!newUser)
			return null;

		return newUser;
	}

}