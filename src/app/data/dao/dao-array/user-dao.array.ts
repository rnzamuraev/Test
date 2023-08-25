import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";

import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { EStaticVar } from "src/app/shared/types/staticVar.enum";
import { IUserResponse } from "src/app/shared/types/user.interface";
import { ApiData } from "../../api.data";
import { IUserDao } from "../dao-interface/user-dao.interface";

@Injectable({ providedIn: "root" })
export class UserDaoArray implements IUserDao {
  constructor(private localStorage: LocalStorageService) {}

  get(): Observable<IUserResponse[]> {
    let data: IUserResponse[] | null = this.localStorage.get(EStaticVar.USERS_TOKEN_KEY);

    if (data === null) {
      data = ApiData.users;
      this._set(data);
    }

    return of(data);
  }

  getId(id: number): Observable<IUserResponse> {
    return this.get().pipe(
      map(data => {
        return data.filter(el => el.id === id)[0];
      })
    );
  }

  post(obj: IUserResponse): Observable<IUserResponse[]> {
    throw new Error("Method not implemented.");
  }
  add(obj: IUserResponse): Observable<IUserResponse> {
    let id: number;

    return this.get().pipe(
      map(data => {
        if (data.length === 0) {
          id = 1;
        } else {
          id = data.length + 1;
        }

        obj.id = id;
        data.push(obj);

        this._set(data);
        return obj;
      })
    );
  }

  put(obj: IUserResponse): void {
    this.get()
      .pipe(
        map(data => {
          const users = data.map(el => {
            if (el.id === obj.id) {
              el = obj;
              return el;
            }

            return el;
          });
          this._set(users);
        })
      )
      .subscribe();
  }

  delete(obj: IUserResponse): Observable<IUserResponse[]> {
    throw new Error("Method not implemented.");
  }

  isUser(email: string, pass?: string): Observable<boolean | IUserResponse> {
    if (pass) {
      return this._isEmailAndPassword(email, pass);
    }

    return this._isEmail(email);
  }

  private _isEmailAndPassword(email: string, pass: string): Observable<boolean | IUserResponse> {
    return this.get().pipe(
      map(data => {
        const user = data.filter(el => el.email === email)[0];
        if (user && user.password === pass) {
          return user;
        }

        return false;
      })
    );
  }

  private _isEmail(email: string): Observable<boolean> {
    return this.get().pipe(
      map(data => {
        if (data.filter(el => el.email === email).length > 0) return true;

        return false;
      })
    );
  }

  private _set(data: IUserResponse[]): void {
    this.localStorage.set(EStaticVar.USERS_TOKEN_KEY, data);
  }

  getToken(): Observable<boolean> {
    let data: string | null = this.localStorage.get(EStaticVar.TOKEN_KEY);

    if (data === null) {
      return of(false);
    }

    return of(true);
  }
  setToken(): void {
    this.localStorage.set(EStaticVar.TOKEN_KEY, EStaticVar.USER_TOKEN);
  }
}
