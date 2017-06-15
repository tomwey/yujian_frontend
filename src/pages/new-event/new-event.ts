import { Component, ElementRef, ViewChild, Renderer } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service';
import { UserService } from '../../providers/user-service';
import { ToolService } from '../../providers/tool-service';
import { QQMaps } from '../../providers/qq-maps';

// @IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {

  @ViewChild('fileInput') nativeFileInputBtn: ElementRef;

  currentPosition: any = null;

  // addFileText: string = '添加图片';
  // imageCover: File = null;
  selectedImage: any = null;
  event: any = { title: '', 
                 image: null, 
                 body: [],
                 hb: null,
                 rule: null,
                 started_at: '', 
                 location: { 
                   address: '', 
                   latLng: '', 
                  }, 
                  range: null,
                };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private renderer: Renderer,
              private api: ApiService,
              private users: UserService,
              private alertCtrl: AlertController,
              private tool: ToolService,
              private qqMaps: QQMaps ) {
    this.qqMaps.startLocating()
      .then(pos => this.currentPosition = pos)
      .catch(error => {});
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewEvent');
  }

  ionViewWillEnter() {
    console.log(this.event);
  }

  uploadFile(): void {
    let clickEvent: MouseEvent = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.nativeFileInputBtn.nativeElement, "dispatchEvent", [clickEvent]
    );
  }

  selectedFiles(event: Event): void {
    let files: FileList = this.nativeFileInputBtn.nativeElement.files;
    // console.log(files);
    // console.log(event);
    if (files.length == 0) return;

    let imageFile = files[0];

    if (!this.isImageType(imageFile)) {
      let alert = this.alertCtrl.create({
        title: '图片格式错误',
        subTitle: '不正确的图片格式，仅支持png,jpg,gif类型的图片',
        buttons: ['确定']
      });
      alert.present();
      return;
    }

    // this.imageCover = imageFile;

    this.event.image = imageFile;
    
    // this.selectedImage = true;

    this.previewImage();
  }

  openInput(): void {
    this.navCtrl.push('InputPage', this.event);
  }

  openBodyInput(): void {
    this.navCtrl.push('EventBodyPage', this.event);
  }

  openRule(): void {
    this.navCtrl.push('NewRulePage', this.event);
  }
  
  openHongbao(): void {
    this.navCtrl.push('NewHongbaoPage', this.event);
  }

  openOption(): void {
    this.navCtrl.push('OptionInfoPage', this.event);
  }

  previewImage(): void {
    let fr: FileReader = new FileReader();
    fr.readAsDataURL(this.event.image);
    fr.onload = (e) => {
      // console.log(e);
      // this.selectedImage = fr.result;
      document.getElementById('event-image')
        .style.backgroundImage = "url(" + fr.result + ")";
    };
  }

  isImageType(file: File): boolean {
    let ext: any = ['image/png', 'image/jpeg', 'image/gif'];
    let fileType = file.type;
    return ext.indexOf(fileType) !== -1;
  }

  send(): void {
    // console.log(this.event);

    if (!this.event.image) {
      this.tool.showToast('活动封面图不能为空');
      return;
    }

    if (!this.event.title) {
      this.tool.showToast('活动标题不能为空');
      return;
    }

    if (this.event.body.length == 0) {
      this.tool.showToast('活动详情不能为空');
      return;
    }

    if (!this.event.hb) {
      this.tool.showToast('活动红包不能为空');
      return;
    }

    if (!this.event.rule) {
      this.tool.showToast('活动规则不能为空');
      return;
    }

    let formData = new FormData();
    formData.append('image', this.event.image);

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

    if (!this.event.location || !this.event.location.latLng) {
      if (this.currentPosition && 
          this.currentPosition.lat != 0 && 
          this.currentPosition.lng != 0) {
        this.event.location = `${this.currentPosition.lng} ${this.currentPosition.lat}`;
      }
    }

    // if (!this.event.location.address) {
    //   this.event.location.address = this.currentPosition.addr;
    // }

    let payload = {
      title: this.event.title,
      body: this.generateBody(),
      started_at: this.event.started_at,
      range: this.event.range,
      location: this.event.location,
      hb: this.event.hb,
      rule: rule,
    }

    console.log(payload);

    formData.append('payload', JSON.stringify(payload));

    this.tool.showLoading('活动发布中...');

    this.users.token().then(token => {
      formData.append("token", token);
      this.api.post2('events', formData).then(data => {
        // console.log(data);
        this.event = { title: '', 
                 image: null, 
                 body: [],
                 hb: null,
                 rule: null,
                 started_at: '', 
                 location: { 
                   address: '', 
                   latLng: '', 
                  }, 
                  range: 30
                };
        // this.imageCover = null;
        this.tool.hideLoading();
        setTimeout(() => {
          this.tool.showToast('发布成功');
          document.getElementById('event-image')
            .style.backgroundImage = null;
        }, 200);
      }).catch(error => {
        console.log(error);
        this.tool.hideLoading();
        setTimeout(() => {
          this.tool.showToast(error.message || error);

        }, 200);
      });
    });
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

  uploadFileToServer(file: File): void {
    // 封装FormData数据
    let formData = new FormData();
    formData.append('file', file);
    
    this.users.token().then(token => {
      formData.append("token", token);
      this.api.upload('assets', formData).then(data => {
        console.log(data);
      }).catch(error => {
        console.log(error);
      });
    });
    // 
  }

}
