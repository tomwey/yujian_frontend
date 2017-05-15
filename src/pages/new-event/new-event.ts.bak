import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewEvent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {

  hbType: string = '0';
  eventType: string = 'Quiz';
  multiple: string = '';
  btnIcon: string = 'ios-add-outline';
  uploadTip: string = '选择文件';
  editorOptions: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.editorOptions = {
      placeholderText: '输入活动内容，支持图文混排！',
      charCounterCount: false,
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEvent');
  }

  uploadFiles(event: Event): void {
    console.log(event);
  }

  changeEventType(): void {
    // console.log(this.event_type);
  }

}
