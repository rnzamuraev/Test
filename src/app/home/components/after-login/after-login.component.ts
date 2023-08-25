import { Component, Input } from "@angular/core";
import { INewPost } from "src/app/shared/types/post.interface";

@Component({
  selector: "app-after-login",
  templateUrl: "./after-login.component.html",
  styleUrls: ["./after-login.component.scss"],
})
export class AfterLoginComponent {
  @Input()
  public allPostsProps!: INewPost[];

  @Input()
  public userPostsProps!: INewPost[];

  constructor() {}
}
