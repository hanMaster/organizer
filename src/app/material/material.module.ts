import { NgModule } from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule} from '@angular/material';

const MaterialComponents = [
  MatButtonModule,
  MatTabsModule,
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
