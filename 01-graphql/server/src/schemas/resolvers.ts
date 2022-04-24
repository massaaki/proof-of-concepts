import { User } from "@prisma/client";
import { Comment } from "../interfaces/comment";
import { Post } from "../interfaces/post";
import { CommentRepository } from "../services/db/repositories/comment-repository";
import { PostRepository } from "../services/db/repositories/post-repository";
import { UserRepository } from "../services/db/repositories/user-repository";

type CreatePostInput = {
	authorId: string;
} & Omit<Post, 'id' | 'comments' | 'author'>;

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
		},
		find_post: async (parent, { id }, context) => {
			const postRepository = new PostRepository();
			const post = await postRepository.find(id);

			if (!post)
				return null;
			return post;
		},
		list_comments: async (parent, args, context) => {
			const commentRepository = new CommentRepository();
			const comments = await commentRepository.findAll();

			if (!comments)
				return null;
			
			return comments;
		},
		find_comment: async (parent, { id }, context) => {
			const commentRepository = new CommentRepository();

			const comment = await commentRepository.find(id);

			if (!comment)
				return null;
			return comment;
		}

	},
	Mutation: {
		create_user: async (parent, {input}, context) => {
			const {name, email} = input as Omit<User, 'id'>;
			
			const userRepository = new UserRepository();
			const user = await userRepository.create({ email, name });
			return user;
		},
		create_post: async (parent, {input}, context) => {
			const { authorId, title, body } = input as CreatePostInput;

			const postRepository = new PostRepository();
			const post = await postRepository.create({
				authorId, title, body
			});

			return post;
		},
		create_comment: async (parent, { input }, context) => {
			const { comment, postId } = input as Omit<Comment, 'id'>
			
			const commentRepository = new CommentRepository();
			const response = await commentRepository.create({ comment, postId });

			return response;
		}
	}
};
