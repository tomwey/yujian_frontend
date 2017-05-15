import { Component, ElementRef, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {

  @ViewChild('fileInput') nativeFileInputBtn: ElementRef;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private renderer: Renderer) {
    
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewEvent');
  }

  uploadFile(): void {
    let clickEvent: MouseEvent = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      this.nativeFileInputBtn.nativeElement, "dispatchEvent", [clickEvent]
    );
  }

  selectedFiles(event: Event): void {
    let files: FileList = this.nativeFileInputBtn.nativeElement.files;
    console.log(files);
  }

}
