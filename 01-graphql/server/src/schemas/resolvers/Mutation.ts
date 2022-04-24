import { Comment } from "../../interfaces/comment";
import { Post } from "../../interfaces/post";
import { User } from "../../interfaces/user";

import { Context } from "../../server";

type CreatePostInput = {
	authorId: string;
} & Omit<Post, 'id' | 'comments' | 'author'>;

export const Mutation = {
	create_user: async (parent, { input }, { userRepository }: Context) => {
		const { name, email } = input as Omit<User, 'id'>;

		const user = await userRepository.create({ email, name });
		return user;
	},
	create_post: async (parent, { input }, { postRepository }: Context) => {
		const { authorId, title, body } = input as CreatePostInput;

		const post = await postRepository.create({
			authorId, title, body
		});

		return post;
	},
	create_comment: async (parent, { input }, { commentRepository }: Context) => {
		const { comment, postId } = input as Omit<Comment, 'id'>

		const response = await commentRepository.create({ comment, postId });
		return response;
	}
};