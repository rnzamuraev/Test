import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ComponentsModule } from "src/app/shared/components/components.module";
import { MaterialModule } from "src/app/shared/material/material.module";
import { NgModulesModule } from 'src/app/shared/ng-modules/ng-modules.module'

@NgModule({
  declarations: [],
  exports: [CommonModule, ComponentsModule, MaterialModule, NgModulesModule],
})
export class SharedModule {}
