import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEventPage } from './new-event';
import { UploadButtonComponent } from '../../components/upload-button/upload-button';

@NgModule({
  declarations: [
    NewEventPage,
    UploadButtonComponent,
  ],
  imports: [
    IonicPageModule.forChild(NewEventPage),
  ],
  exports: [
    NewEventPage
  ]
})
export class NewEventPageModule {}
