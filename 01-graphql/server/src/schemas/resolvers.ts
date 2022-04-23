import { User } from "@prisma/client";
import { UserRepository } from "../services/db/repositories/user-repository";

export const resolvers = {
	Query: {
		list_users: async () => {
			const userRepository = new UserRepository();
			const users = await userRepository.findAll();

			return users;
		}
	},
	Mutation: {
		create_user: async (parent, {input}, context) => {
			const {name, email} = input as Omit<User, 'id'>;
			
			const userRepository = new UserRepository();
			const user = await userRepository.create({ email, name });
			return user;
		}
	}
};