import { Comment } from "./comment";
import { User } from "./user";

export interface Post {
	id: string;
	title: string;
	body: string;
	author?: User;
	comments?: Comment[];
}