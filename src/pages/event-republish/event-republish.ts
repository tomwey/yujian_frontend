import { Component } from '@angular/core';
import { IonicPage, NavController, 
         NavParams, ViewController } from 'ionic-angular';
import { ToolService } from "../../providers/tool-service";
import { EventsService } from "../../providers/events-service";

/**
 * Generated class for the EventRepublishPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-republish',
  templateUrl: 'event-republish.html',
})
export class EventRepublishPage {

  event: any = { 
                 id: 0,
                 hb: null,
                 rule: null,
                };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewController: ViewController,
              private tool: ToolService,
              private events: EventsService,
              ) {
    this.event.id = this.navParams.data.id;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EventRepublishPage');
  }

  close(): void {
    this.viewController.dismiss();
  }

  send(): void {
    if (!this.event.rule) {
      this.tool.showToast('必须要指定活动规则');
      return;
    }

    if (!this.event.hb) {
      this.tool.showToast('必须要设置红包');
      return;
    }

    let rule: any = null;
    if (this.event.rule.type === 'Quiz') {
      let answerStr = '';
      let answers = this.event.rule.answers;
      for(let i=0; i<answers.length; i++) {
        let item = answers[i];
        answerStr += `${item.value}`;
        if (i !== answers.length - 1) {
          answerStr += ',';
        }
      }

      rule = { type: 'Quiz',
               question: this.event.rule.question,
               answer: this.event.rule.answer,
               answers: answerStr };
    } else if ( this.event.rule.type === 'Checkin' ) {
      rule = { type: 'Checkin',
               address: this.event.rule.location.address,
               location: this.event.rule.location.latLng,
               accuracy: this.event.rule.accurcy 
              };
    }

    let payload = {
      hb: this.event.hb,
      rule: rule
    }

    this.tool.showLoading('发布提交中...');
    this.events.republish(this.event.id, payload)
      .then(data => {
        this.tool.hideLoading();

        this.tool.showToast('发布成功~~!');

        this.viewController.dismiss(true).catch(error => {});
      })
      
      .catch(error => {
        this.tool.hideLoading();

        setTimeout(() => {
          this.tool.showToast(error.message || error);
        }, 200);
      });
  }

  openRule(): void {
    this.navCtrl.push('NewRulePage', this.event);
  }
  
  openHongbao(): void {
    this.navCtrl.push('NewHongbaoPage', this.event);
  }

}
