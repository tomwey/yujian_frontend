import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { App } from 'ionic-angular';
import { EventsService } from '../../providers/events-service' 

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
              private tool: ToolService) {
    this.payload = this.navParams.data;
    // console.log(`payload: ${this.payload.location}`);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HBWall');
  }

  dismiss(data): void {
    this.viewController.dismiss();
  }

  openHB(): void {
    
    this.tool.showLoading('红包打开中...');
    this.events.commit(this.payload)
      .then(data => {
        this.gotoSuccessPage(data);
        this.tool.hideLoading();
      })
      .catch(error => {
        this.tool.hideLoading();
        setTimeout(() => {
          this.tool.showToast(error);
        }, 100);
      });
  }

  gotoSuccessPage(data): void {
    console.log(data);

    this.viewController.dismiss();
    this.app.getRootNav().push('EventResult', data);
  }

}
