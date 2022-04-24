import { Context } from "../../server";

export const Query = {
	list_users: async (parent, args, { userRepository }: Context) => {
		const users = await userRepository.findAll();

		return users;
	},
	find_user: async (parent, { id }, { userRepository }: Context) => {
		const user = await userRepository.find(id);

		if (!user)
			return null;
		return user;
	},
	list_posts: async (parent, args, { postRepository }: Context) => {
		const post = await postRepository.findAll();

		if (!post)
			return null;
		return post;
	},
	find_post: async (parent, { id }, { postRepository }: Context) => {
		const post = await postRepository.find(id);

		if (!post)
			return null;

		return post;
	},
	list_comments: async (parent, args, { commentRepository }: Context) => {
		const comments = await commentRepository.findAll();

		if (!comments)
			return null;

		return comments;
	},
	find_comment: async (parent, { id }, { commentRepository }: Context) => {
		const comment = await commentRepository.find(id);

		if (!comment)
			return null;
		return comment;
	}
};