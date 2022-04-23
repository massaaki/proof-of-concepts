import { gql } from 'apollo-server';

export const typeDefs = gql`
	type Query {
		list_users: [User!]!
	}

	type User {
		id: String!
		name: String!
		email: String!
	}
`;