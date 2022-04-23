import { ApolloServer, gql } from 'apollo-server';

import {typeDefs, resolvers} from './schemas';

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen().then(({ url }) => {
	console.log(`Server is running at ${url}`);
});