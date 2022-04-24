import { Context } from "../../server";

export const Post = {
	comments: async (parent, args, { commentRepository }: Context) => {
		const { id: postId } = parent;
		const comments = await commentRepository.getCommentsByPostId(postId);
		return comments;
	},
	author: async (parent, args, { userRepository }: Context) => {
		const { authorId } = parent;
		const author = await userRepository.find(authorId);
		return author;
	}
};