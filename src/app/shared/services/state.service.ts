import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { IUserResponse } from "src/app/shared/types/user.interface";

@Injectable({ providedIn: "root" })
export class StateService {
  private user = new BehaviorSubject<IUserResponse | null>(null);

  public get getUser$(): Observable<IUserResponse | null> {
    return this.user.asObservable();
  }
  public setUser$(data: IUserResponse | null) {
    this.user.next(data);
  }
}
