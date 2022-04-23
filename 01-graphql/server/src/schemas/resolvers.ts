import { UserRepository } from "../services/db/repositories/user-repository";

export const resolvers = {
	Query: {
		list_users: async () => {
			const userRepository = new UserRepository();
			const users = await userRepository.findAll();

			return users;
		}
	}
};