import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './schemas';
import { UserRepository } from './services/db/repositories/user-repository';
import { PostRepository } from './services/db/repositories/post-repository';
import { CommentRepository } from './services/db/repositories/comment-repository';


export type Context = {
	userRepository: UserRepository;
	postRepository: PostRepository;
	commentRepository: CommentRepository;
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		userRepository: new UserRepository(),
		postRepository: new PostRepository(),
		commentRepository: new CommentRepository()
	} as Context
});

server.listen(4000).then(({ url }) => {
	console.log(`Server is running at ${url}`);
});