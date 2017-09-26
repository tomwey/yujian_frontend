import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPayQrcodePage } from './user-pay-qrcode';

@NgModule({
  declarations: [
    UserPayQrcodePage,
  ],
  imports: [
    IonicPageModule.forChild(UserPayQrcodePage),
  ],
  exports: [
    UserPayQrcodePage
  ]
})
export class UserPayQrcodePageModule {}
