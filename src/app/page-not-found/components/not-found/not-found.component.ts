import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { StateService } from "src/app/shared/services/state.service";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"],
})
export class NotFoundComponent implements OnInit {
  public isUser = false;
  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.setIsUser();
  }

  private setIsUser() {
    this.stateService.getUser$.subscribe(data => {
      if (data === null) {
        this.isUser = false;
      }

      this.isUser = true;
    });
  }

  public onGoTo(value: string) {
    this.router.navigate([`/${value}`]);
  }
}
