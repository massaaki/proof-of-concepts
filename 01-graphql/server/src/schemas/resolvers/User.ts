import { Context } from "../../server";

export const User = {
	posts: async (parent, args, { postRepository }: Context) => {
		const { id: userId } = parent;
		const posts = postRepository.getPostsByUserId(userId);
		return posts;
	}
};