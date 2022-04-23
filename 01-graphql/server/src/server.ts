import { ApolloServer, gql } from 'apollo-server';

import {MongoDbClient} from './services/db/mongodb-client';
import {typeDefs, resolvers} from './schemas';



const server = new ApolloServer({
	typeDefs,
	resolvers
});



(async () => {
	const client = MongoDbClient.getInstance();
	const allUsers = await client.user.findMany();

	console.log(allUsers);

})()



// server.listen(4000).then(({ url }) => {
// 	console.log(`Server is running at ${url}`);
// });