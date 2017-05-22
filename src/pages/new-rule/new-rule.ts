import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewRulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-rule',
  templateUrl: 'new-rule.html',
})
export class NewRulePage {

  event: any = null;
  
  quizDesc: string = '';
  checkinDesc: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.data;
  }

  ionViewWillEnter(): void {
    if (this.event.rule) {
      if (this.event.rule.type === 'Quiz') {
        this.quizDesc = this.event.rule.question;
        this.checkinDesc = '适合需要到现场签到的活动';
      } else if ( this.event.rule.type === 'Checkin' ) {
        this.quizDesc = '适合广告类活动';
        this.checkinDesc = this.event.rule.address;
      }
    } else {
      this.quizDesc = '适合广告类活动';
      this.checkinDesc = '适合需要到现场签到的活动';
    }
  }
  gotoRuleDetail(name: string): void {
    if (name === 'Quiz') {
      this.navCtrl.push('NewQuizRulePage', this.event);
    } else if (name === 'Checkin') {
      this.navCtrl.push('NewCheckinRulePage', this.event);
    }
  }

}
