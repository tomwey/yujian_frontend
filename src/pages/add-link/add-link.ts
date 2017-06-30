import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';

/**
 * Generated class for the AddLinkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-link',
  templateUrl: 'add-link.html',
})
export class AddLinkPage {

  link: any = { url: '', text: '' };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewController: ViewController,
              private tool: ToolService) {
  }

  save(): void {
    if (this.link.url.length === 0) {
      this.tool.showToast('URL不能为空');
      return;
    }
    this.viewController.dismiss(this.link);
  }

  cancel(): void {
    this.viewController.dismiss(null);
  }

}
