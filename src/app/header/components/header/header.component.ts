import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StateService } from "src/app/shared/services/state.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isLogin!: boolean;
  public userName!: string;

  constructor(private router: Router, private stateService: StateService) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.stateService.getUser$.subscribe(data => {
      if (data === null) {
        this.isLogin = false;
        return;
      }

      this.isLogin = true;
      this.userName = data.name;
    });
  }

  public onGoTo(value: string): void {
    if (value === "logout") {
      this.stateService.setUser$(null);
      value = "";
    }

    this.router.navigate([`/${value}`]);
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      console.log("timeout отработал");
    }, 5000);
  }
}
