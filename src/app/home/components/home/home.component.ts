import { Component, OnInit } from "@angular/core";
import { zip } from "rxjs";
import { DataService } from "src/app/shared/services/data.service";
import { StateService } from "src/app/shared/services/state.service";
import { INewPost } from "src/app/shared/types/post.interface";
import { IUserResponse } from "src/app/shared/types/user.interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public isUser!: boolean;
  public allPosts!: INewPost[];
  public userPosts!: INewPost[];
  // public userId!: number;

  constructor(private dataService: DataService, private stateService: StateService) {}

  ngOnInit(): void {
    this.initPostsAndUser();
    this.getIsUser();
  }

  private initPostsAndUser() {
    zip(this.dataService.getPosts(), this.stateService.getUser$).subscribe(data => {
      this.initAllPosts(data[0]);
      this.getUserPosts(data[0], data[1]);
    });
  }

  private initAllPosts(data: INewPost[]) {
    console.log(data);
    this.allPosts = data;
  }

  private getUserPosts(posts: INewPost[], user: IUserResponse | null) {
    console.log(posts, user);
    if (user === null) {
      this.isUser = false;
      return;
    }

    this.isUser = true;
    const newAllPosts = posts.filter(post => post.userId === user.id);
    this.userPosts = newAllPosts;
  }
  private getIsUser() {
    this.stateService.getUser$.subscribe(data => {
      if (data === null) {
        this.isUser = false;
        return;
      }

      this.isUser = true;
    });
  }
}
