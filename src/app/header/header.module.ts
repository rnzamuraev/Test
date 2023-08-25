import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { HeaderComponent } from "src/app/header/components/header/header.component";

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
