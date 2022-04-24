import { User } from '../interfaces/user';
import { Comment } from "../interfaces/comment";
import { Post } from "../interfaces/post";
import { Context } from "../server";

type CreatePostInput = {
	authorId: string;
} & Omit<Post, 'id' | 'comments' | 'author'>;

export const resolvers = {
	Query: {
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
	},
	// Post Relation
	Post: {
		comments: async (parent, args, { commentRepository }: Context) => {
			const { id: postId } = parent;
			const comments = await commentRepository.getCommentsByPostId(postId);
			return comments;
		},
		author: async (parent, args, {userRepository}: Context) => {
			const { authorId } = parent;
			const author = await userRepository.find(authorId);
			return author;
		}
	},
	Mutation: {
		create_user: async (parent, { input }, { userRepository }: Context) => {
			const {name, email} = input as Omit<User, 'id'>;
		
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
	}
};
