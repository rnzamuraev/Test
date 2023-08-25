import { ICommonDao } from "./common-dao.interface";
import { Observable } from "rxjs";

import { IUserResponse } from "src/app/shared/types/user.interface";

export interface IUserDao extends ICommonDao<IUserResponse> {
  add(obj: IUserResponse): Observable<IUserResponse>;
  isUser(email: string, password?: string): Observable<boolean | IUserResponse>;
  getToken(): Observable<boolean>
  setToken(): void
}
