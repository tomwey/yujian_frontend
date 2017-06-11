import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawPage } from './withdraw';
import { StringNumberPipe } from '../../pipes/string-number/string-number';

@NgModule({
  declarations: [
    WithdrawPage,
    StringNumberPipe,
  ],
  imports: [
    IonicPageModule.forChild(WithdrawPage),
  ],
  exports: [
    WithdrawPage
  ]
})
export class WithdrawPageModule {}
