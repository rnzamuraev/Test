import { Observable } from "rxjs";

export interface ICommonDao<T> {
  get(): Observable<T[]>;
  getId(id: number): Observable<T | null>;
  post(obj: T): Observable<T[]>;
  put(obj: T): void;
  delete(obj: T): Observable<T[]>;
}
