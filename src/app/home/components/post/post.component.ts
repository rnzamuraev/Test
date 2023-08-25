import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { INewPost } from "src/app/shared/types/post.interface";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent {
  @Input()
  public postProps!: INewPost;

  constructor(private router: Router) {}

  public onOpenPost(id: number) {
    this.router.navigate([`/post/${id}`]);
    console.log(id);
  }
}
