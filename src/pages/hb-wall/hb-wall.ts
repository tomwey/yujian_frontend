import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { App } from 'ionic-angular';
import { EventsService } from '../../providers/events-service';
import { BadgesService } from '../../providers/badges-service';

/**
 * Generated class for the HBWall page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hb-wall',
  templateUrl: 'hb-wall.html',
})
export class HBWallPage {
  payload: any = null;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewController: ViewController,
              private app: App,
              private events: EventsService,
              private badges: BadgesService,
              private tool: ToolService,) {
    this.payload = this.navParams.data;
    // console.log(`payload: ${this.payload.location}`);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HBWall');
  }

  dismiss(data): void {
    this.viewController.dismiss();
  }

  close(event): void {
    event.stopPropagation();

    this.dismiss(null);
  }

  openHB(): void {
    
    this.tool.showLoading('红包打开中...');
    this.events.commit(this.payload)
      .then(data => {
        
        if (data.card) {
          this.badges.incrementCurrentBadge();
        }

        this.gotoSuccessPage(data);
        this.tool.hideLoading();
      })
      .catch(error => {
        this.tool.hideLoading();
        // console.log(error);
        this.gotoSuccessPage({ hb: this.payload.hb, code: -1001, message: error.message || error });
        // setTimeout(() => {
        //   this.tool.showToast(error);
        // }, 100);
      });
  }

  gotoSuccessPage(data): void {
    // console.log(data);

    this.viewController.dismiss();
    this.app.getRootNavs()[0].push('EventResult', data);
  }

}
