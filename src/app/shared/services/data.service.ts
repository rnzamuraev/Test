import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, zip } from "rxjs";

import { PostDaoArray } from "src/app/data/dao/dao-array/post-dao.array";
import { UserDaoArray } from "src/app/data/dao/dao-array/user-dao.array";
import { INewPost, IPost } from "src/app/shared/types/post.interface";
import { IUserResponse } from "src/app/shared/types/user.interface";

const url = "https://jsonplaceholder.typicode.com/posts/";

@Injectable({ providedIn: "root" })
export class DataService {
  constructor(
    private http: HttpClient,
    private userDaoArray: UserDaoArray,
    private postDaoArray: PostDaoArray
  ) {}

  // *** Post
  public getPosts(): Observable<INewPost[]> {
    return zip(this.http.get<IPost[]>(url), this.userDaoArray.get(), this.postDaoArray.get()).pipe(
      map(data => {
        console.log(data);
        const newPosts: INewPost[] = [];
        data[0].forEach(post => {
          for (let i = 0; i < data[1].length; i++) {
            if (post.userId === data[1][i].id) {
              let obj = { ...post, name: data[1][i].name };
              newPosts.push(obj);
              return;
            }
          }
        });
        const newAllPosts = [...newPosts, ...data[2]];
        console.log(newAllPosts);
        return newAllPosts;
      }),
      catchError(() => {
        console.error("Посты с сервера не были получены");
        return of([]);
      })
    );
  }
  public getPostId(id: number): Observable<INewPost | null> {
    return zip(
      this.http.get<IPost>(`${url}${id}`),
      this.postDaoArray.getId(id),
      this.userDaoArray.get()
    ).pipe(
      map(data => {
        console.log(data);
        let post!: INewPost;
        if (data[0]) {
          const user = this._getUser(data[2], data[0]);
          return (post = { ...data[0], name: user.name });
        } else if (data[1]) {
          const user = this._getUser(data[2], data[1]);
          return (post = { ...data[1], name: user.name });
        } else {
          console.error("такой страницы не существует");
          return null;
        }
      }),
      catchError(() => {
        console.error("Пост с сервера не был получен");
        return of(null);
      })
    );
  }
  private _getUser(users: IUserResponse[], post: IPost) {
    return users.filter(user => user.id === post.userId)[0];
  }

  // *** User
  public getUser(id: number): Observable<IUserResponse> {
    return this.userDaoArray.getId(id);
  }
  public addUser(user: IUserResponse): Observable<IUserResponse> {
    return this.userDaoArray.add(user);
  }
  public updateUser(user: IUserResponse): void {
    return this.userDaoArray.put(user);
  }
  public isUser(email: string, pass?: string): Observable<boolean | IUserResponse> {
    return this.userDaoArray.isUser(email, pass);
  }
}
