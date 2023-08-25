import { NgModule } from "@angular/core";

import { BadgeAvatarComponent } from "./badge-avatar/badge-avatar.component";
import { BeforeLoginComponent } from "./before-login/before-login.component";
import { LoadingComponent } from "./loading/loading.component";

@NgModule({
  declarations: [BadgeAvatarComponent, BeforeLoginComponent, LoadingComponent],
  exports: [BadgeAvatarComponent, BeforeLoginComponent, LoadingComponent],
})
export class ComponentsModule {}
