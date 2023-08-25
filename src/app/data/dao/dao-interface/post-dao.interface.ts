import { INewPost } from "src/app/shared/types/post.interface";
import { ICommonDao } from "./common-dao.interface";

export interface IPostDao extends ICommonDao<INewPost> {}
