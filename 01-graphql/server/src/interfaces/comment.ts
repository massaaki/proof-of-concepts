import { Post } from "./post";

export interface Comment {
	id: string;
	comment: string;
	postId: string;
}