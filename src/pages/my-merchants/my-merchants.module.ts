import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyMerchants } from './my-merchants';

@NgModule({
  declarations: [
    MyMerchants,
  ],
  imports: [
    IonicPageModule.forChild(MyMerchants),
  ],
  exports: [
    MyMerchants
  ]
})
export class MyMerchantsModule {}
