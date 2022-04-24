import { Comment } from "../../../interfaces/comment";
import { DbClient } from "../db-client";

export class CommentRepository {
	private client = DbClient.getInstance();

	async findAll(): Promise<Comment[]> {
		const response = await this.client.comment.findMany();

		const comments: Comment[] = response.map(item => ({
			id: item.id,
			comment: item.comment,
			postId: item.postId
		}));
		return comments;
	}
}