import { gql } from 'apollo-server';

export const typeDefs = gql`
	type Query {
		list_users: [User!]!
		find_user(id: ID!): User
		list_posts: [Post]!
		find_post(id: ID!): Post
		list_comments: [Comment!]!
		find_comment(id: ID!): Comment
	}

	type Mutation {
		create_user(input: CreateUserInput!): User!
		create_post(input: CreatePostInput!): Post!
		create_comment(input: CreateCommentInput!): Comment!
	}

	type User {
		id: String!
		name: String!
		email: String!
		posts: [Post!]
	}

	input CreateUserInput {
		name: String!
		email: String!
	}

	type Post {
		id: String!
		title: String!
		body: String!
		author: User!
		comments: [Comment!]
	}

	input CreatePostInput {
		authorId: String!
		title: String!
		body: String!
	}

	type Comment {
		id: String!
		comment: String!
		postId: String!
	}
	
	input CreateCommentInput {
		comment: String!
		postId: String!
	}
`;