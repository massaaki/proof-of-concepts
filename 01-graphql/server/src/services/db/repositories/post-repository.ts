import { MongoDbClient } from '../mongodb-client';
import { Post } from '../../../interfaces/post';
import { User } from '../../../interfaces/user';

type CreatePostProps = {
	authorId: string;
} & Omit<Post, 'id' | 'comments' | 'author'>;

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

	async create({ authorId, title, body }: CreatePostProps): Promise<Post> {
		
		const authorExists = await this.client.user.findFirst({
			where: {
				id: authorId
			}
		});

		if (!authorExists) {
			return null;
		}
		
		const newPost = await this.client.post.create({
			data: {
				title,
				body,
				authorId
			},
			include: {
				author: true
			}
		});
		

		return {
			id: newPost.id,
			author: newPost.author,
			title: newPost.title,
			body: newPost.body
		};
	}

}