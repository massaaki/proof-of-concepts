import { Comment } from "./comment";
import { User } from "./user";

export interface Post {
	id: string;
	title: string;
	body: string;
	autor: User;
	comments?: Comment[];
}