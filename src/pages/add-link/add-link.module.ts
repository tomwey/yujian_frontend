import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLinkPage } from './add-link';

@NgModule({
  declarations: [
    AddLinkPage,
  ],
  imports: [
    IonicPageModule.forChild(AddLinkPage),
  ],
  exports: [
    AddLinkPage
  ]
})
export class AddLinkPageModule {}
