import { IPost } from "./post.interface";
export interface IUserLogin {
  password: string;
  email: string;
}
export interface IAddUser extends IUserLogin {
  name: string;
}
export interface IUserResponse extends IAddUser {
  id: number;
  phone: string;
  avatar: string;
  posts?: IPost[];
}
