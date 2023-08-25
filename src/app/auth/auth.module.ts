import { NgModule } from "@angular/core";

import { FormComponent } from "src/app/auth/components/form/form.component";
import { LoginComponent } from "src/app/auth/components/login/login.component";
import { RegisterComponent } from "src/app/auth/components/register/register.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [RegisterComponent, LoginComponent, FormComponent],
  imports: [SharedModule],
})
export class AuthModule {}
