import {User} from "./User";
import {Restaurant} from "./Restaurant";

export class Comment {
  _id: string;
  restaurant: Restaurant;
  comment: string;
  author: User;
  date: string;
  name: string;
  surname: string;
  rating: number;
}
