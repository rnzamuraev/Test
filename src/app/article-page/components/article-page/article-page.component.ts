import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { DataService } from "src/app/shared/services/data.service";
import { StateService } from "src/app/shared/services/state.service";
import { INewPost } from "src/app/shared/types/post.interface";

@Component({
  selector: "app-article-page",
  templateUrl: "./article-page.component.html",
  styleUrls: ["./article-page.component.scss"],
})
export class ArticlePageComponent implements OnInit {
  public post!: INewPost;
  public id!: number;
  public isUser!: boolean;

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.getPageId();
  }

  private getPageId() {
    this.route.params.subscribe(data => {
      this.id = data["id"];
    });
  }

  ngOnInit(): void {
    this.getUser$();
    this.getPost();
  }

  private getUser$() {
    this.stateService.getUser$.subscribe(data => {
      if (data === null) {
        this.isUser = false;
        return;
      }
      this.isUser = true;
    });
  }

  private getPost() {
    this.dataService.getPostId(this.id).subscribe(data => {
      if (data !== null) {
        this.post = data;
      }
    });
  }

  public onGoToBack() {
    this.location.back();
  }
}
