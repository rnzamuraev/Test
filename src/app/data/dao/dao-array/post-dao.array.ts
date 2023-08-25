import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { IPostDao } from "../dao-interface/post-dao.interface";

import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { INewPost } from "src/app/shared/types/post.interface";
import { EStaticVar } from "src/app/shared/types/staticVar.enum";

@Injectable({ providedIn: "root" })
export class PostDaoArray implements IPostDao {
  constructor(private localStorage: LocalStorageService) {}

  get(): Observable<INewPost[]> {
    let data: INewPost[] | null = this.localStorage.get(EStaticVar.POSTS_TOKEN_KEY);

    if (data === null) {
      data = [];
    }

    return of(data);
  }
  getId(id: number): Observable<INewPost | null> {
    return this.get().pipe(
      map(data => {
        const post = data.filter(el => el.id === id)[0];
        if (post) return post;

        return null;
      })
    );
  }

  post(obj: INewPost): Observable<INewPost[]> {
    return this.get().pipe(
      map(data => {
        let id!: number;

        if (data.length === 0) {
          id = 101;
        } else {
          id = data.length + 101;
        }

        obj.id = id;
        data.unshift(obj);
        return data;
      })
    );
  }
  put(obj: INewPost): void {
    throw new Error("Method not implemented.");
  }
  delete(obj: INewPost): Observable<INewPost[]> {
    throw new Error("Method not implemented.");
  }
}
