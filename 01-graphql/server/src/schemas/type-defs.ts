import { gql } from 'apollo-server';

export const typeDefs = gql`
	type Query {
		list_users: [User!]!
		find_user(id: ID!): User
	}

	type Mutation {
		create_user(input: CreateUserInput!): User!
	}

	type User {
		id: String!
		name: String!
		email: String!
	}

	input CreateUserInput {
		name: String!
		email: String!
	}
	
`;