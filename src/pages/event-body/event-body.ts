import { Component,ElementRef, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user-service'
import { ApiService } from '../../providers/api-service';
import { ToolService } from '../../providers/tool-service';

/**
 * Generated class for the InputBodyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-body',
  templateUrl: 'event-body.html',
})
export class EventBodyPage {

  @ViewChild('fileInput') nativeFileInputBtn: ElementRef;
  @ViewChild('eventBody') nativeEventBody: ElementRef;

  event: any = null;
  bodyItems: any = [{ image: 'http://img-dev-qn.deyiwifi.com/uploads/attachment/data/7/c9a1ce10-f0f6-4df4-9756-cac996ec4677.png?e=1810886375&token=fLagxpsOWh8auXaF7WP5nGRR86PTyPW1L6xJ8wZx:5-fhqjB14sveUCyt_oZoT_ZG3jc=', 
                      title: ''},{ image: 'http://img-dev-qn.deyiwifi.com/uploads/attachment/data/7/c9a1ce10-f0f6-4df4-9756-cac996ec4677.png?e=1810886375&token=fLagxpsOWh8auXaF7WP5nGRR86PTyPW1L6xJ8wZx:5-fhqjB14sveUCyt_oZoT_ZG3jc=', 
                      title: ''} ];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private renderer: Renderer,
              private users: UserService,
              private api: ApiService,
              private tool: ToolService,
              private alertCtrl: AlertController) {
    this.event = this.navParams.data;
    this.bodyItems = this.event.body;
  }

  isImageType(file: File): boolean {
    let ext: any = ['image/png', 'image/jpeg', 'image/gif'];
    let fileType = file.type;
    return ext.indexOf(fileType) !== -1;
  }

  selectedFiles(event): void {
    let files: FileList = this.nativeFileInputBtn.nativeElement.files;
    console.log(files);

    // 封装FormData数据
    this.uploadFilesToServer(files);
  }

  remove(item): void {
    let alert = this.alertCtrl.create({
      title: '删除提示',
      subTitle: '您确定吗？',
      buttons: [{
        text: '确定',
        handler: () => {
          this.doRemove(item);
        }
      },
      {
        text: '取消',
        role: 'cancel',
      }]
    });
    alert.present();
  }

  doRemove(item): void {
    let index = this.bodyItems.indexOf(item);

    if (index > -1) {
      let div = document.getElementById(`item-${index}`);
      this.nativeEventBody.nativeElement.removeChild(div);
      this.bodyItems.splice(index, 1);
    }
  }

  uploadFilesToServer(files): void {
    this.tool.showLoading('图片上传中...');

    let formData = new FormData();

    for (let i=0; i<files.length; i++) {
      formData.append('files[][file]', files[i]);
    }

    this.users.token().then(token => {
      formData.append("token", token);
      this.api.upload('assets/upload2', formData).then(data => {
        // console.log(data);
        data.forEach(obj => {
          this.bodyItems.push({ image: obj.url, title: '' });
        });
        
        this.tool.hideLoading();
      }).catch(error => {
        this.tool.hideLoading();
        setTimeout(function() {
          this.tool.showToast(error);
        }, 200);
        console.log(error);
      });
    });
  }

  uploadFile() {
    let clickEvent: MouseEvent = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.nativeFileInputBtn.nativeElement, "dispatchEvent", [clickEvent]
    );
  }

  save(): void {
    console.log(this.bodyItems);
    this.event.body = this.bodyItems;
  }

}
