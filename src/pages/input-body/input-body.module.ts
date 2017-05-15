import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InputBodyPage } from './input-body';

@NgModule({
  declarations: [
    InputBodyPage,
  ],
  imports: [
    IonicPageModule.forChild(InputBodyPage),
  ],
  exports: [
    InputBodyPage
  ]
})
export class InputBodyPageModule {}
