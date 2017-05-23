import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OptionInfoPage } from './option-info';

@NgModule({
  declarations: [
    OptionInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(OptionInfoPage),
  ],
  exports: [
    OptionInfoPage
  ]
})
export class OptionPageModule {}
