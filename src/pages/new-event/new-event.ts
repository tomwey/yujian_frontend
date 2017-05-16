import { Component, ElementRef, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service';
import { UserService } from '../../providers/user-service';

@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {

  @ViewChild('fileInput') nativeFileInputBtn: ElementRef;

  // addFileText: string = '添加图片';
  imageCover: File = null;
  selectedImage: any = null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private renderer: Renderer,
              private api: ApiService,
              private users: UserService,
              private alertCtrl: AlertController ) {
    
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewEvent');
  }

  ionViewWillEnter() {
    console.log('view will appear');
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

    this.imageCover = imageFile;
    // this.selectedImage = true;

    this.previewImage();
  }

  openInput(): void {
    this.navCtrl.push('InputPage', { title: '设置活动标题', text: '' })
  }

  openBodyInput(): void {
    this.navCtrl.push('InputBodyPage');
  }

  openRule(): void {
    this.navCtrl.push('NewRulePage');
  }
  
  openHongbao(): void {
    this.navCtrl.push('NewHongbaoPage');
  }

  openOption(): void {
    this.navCtrl.push('OptionPage');
  }

  previewImage(): void {
    let fr: FileReader = new FileReader();
    fr.readAsDataURL(this.imageCover);
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
