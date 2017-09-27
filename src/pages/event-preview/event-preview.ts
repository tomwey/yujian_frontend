import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserService } from "../../providers/user-service";
// import { ToolService } from "../../providers/tool-service";

/**
 * Generated class for the EventPreviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-preview',
  templateUrl: 'event-preview.html',
})
export class EventPreviewPage {

  event: any = null;
  eventBody: string = '';
  // user: any = null;
  commitButtonText: string = '';
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private users: UserService,
              // private tool: ToolService,
              private viewController: ViewController,
              ) {
    this.event = this.navParams.data;
    if ( this.event.rule.type === 'Quiz' ) {
      this.event.rule.name = '答题抢红包';
      this.commitButtonText = '提交答案，抢红包';
      this.event.rule_type = 'QuizRule';
    } else if ( this.event.rule.type === 'Checkin' ) {
      this.event.rule.name = '签到抢红包';
      this.commitButtonText = '签到抢红包';
      this.event.rule_type = 'CheckinRule';
    }
  }

  ionViewDidEnter(): void {
    this.users.loadUser()
      .then(data => {
        // this.user = data;
        this.event.owner = data;
        this.eventBody   = this.generateBody();

        // console.log(this.event);

      })
      .catch(error => {
        // console.log(error);
      });
  }

  close(): void {
    this.viewController.dismiss().catch(() => {});
  }

  generateBody(): string {
    if (this.event.body.length == 0) {
      return '';
    }

    let string = '';
    this.event.body.forEach(item => {
      if (item.image)
        string += `<img src="${item.image}">`
      if (item.title)
        string += `<p>${item.title}</p>`
    });
    return string;
  }

}
