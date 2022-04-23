import { ApolloServer } from 'apollo-server';
import {typeDefs, resolvers} from './schemas';

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen(4000).then(({ url }) => {
	console.log(`Server is running at ${url}`);
});