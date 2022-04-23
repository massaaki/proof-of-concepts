import { User } from "@prisma/client";
import { PostRepository } from "../services/db/repositories/post-repository";
import { UserRepository } from "../services/db/repositories/user-repository";

export const resolvers = {
	Query: {
		list_users: async () => {
			const userRepository = new UserRepository();
			const users = await userRepository.findAll();

			return users;
		},
		find_user: async (parent, { id }, context) => {
			const userRepository = new UserRepository();
			const user = await userRepository.find(id);

			if (!user)
				return null;
			return user;
		},
		list_posts: async (parent, args, context) => {
			const postRepository = new PostRepository();
			const post = await postRepository.findAll();

			if (!post)
				return null;
			return post;
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