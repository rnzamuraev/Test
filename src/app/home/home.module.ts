import { NgModule } from "@angular/core";

import { AfterLoginComponent } from "src/app/home/components/after-login/after-login.component";
import { HomeComponent } from "src/app/home/components/home/home.component";
import { SharedModule } from "src/app/shared/shared.module";
import { PostComponent } from "./components/post/post.component";

@NgModule({
  declarations: [HomeComponent, AfterLoginComponent, PostComponent],
  imports: [SharedModule],
  // exports: [HomeComponent, BeforeLoginComponent, AfterLoginComponent, PostComponent],
})
export class HomeModule {}
