import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { App } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewController: ViewController,
              private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HBWall');
  }

  dismiss(data): void {
    this.viewController.dismiss();
  }

  openHB(): void {
    this.viewController.dismiss();
    this.app.getRootNav().push('');
  }

}
