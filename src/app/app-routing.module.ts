import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "src/app/auth/components/login/login.component";
import { RegisterComponent } from "src/app/auth/components/register/register.component";
import { HomeComponent } from "src/app/home/components/home/home.component";
import { ArticlePageComponent } from "src/app/article-page/components/article-page/article-page.component";
import { NotFoundComponent } from "src/app/page-not-found/components/not-found/not-found.component";

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },

  { path: "post/:id", component: ArticlePageComponent },

  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },

  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
