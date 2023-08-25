import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "src/app/app-routing.module";
import { AppComponent } from "src/app/app.component";
import { ArticlePageModule } from "src/app/article-page/article-page.module";
import { AuthModule } from "src/app/auth/auth.module";
import { FooterModule } from "src/app/footer/footer.module";
import { HeaderModule } from "src/app/header/header.module";
import { HomeModule } from "src/app/home/home.module";
import { SharedModule } from "src/app/shared/shared.module";
import { PageNotFoundModule } from "./page-not-found/page-not-found.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    AuthModule,
    HomeModule,
    ArticlePageModule,
    PageNotFoundModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
