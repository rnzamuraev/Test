import { NgModule } from "@angular/core";

import { ArticlePageComponent } from "src/app/article-page/components/article-page/article-page.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ArticlePageComponent],
  imports: [SharedModule],
})
export class ArticlePageModule {}
