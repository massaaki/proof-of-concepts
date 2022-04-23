import { MongoDbClient } from '../mongodb-client';
import { Post } from '../../../interfaces/post';
import { User } from '../../../interfaces/user';

export class PostRepository {
	private client = MongoDbClient.getInstance();

	async findAll() : Promise<Post[]> {
		const response = await this.client.post.findMany({
			include: {
				author: true
			}
		});

		const posts: Post[] = response.map(({ id, author, body, title }) => {
			return {
				id,
				author: author as User,
				title,
				body
			}
		});

		return posts;
	}

}