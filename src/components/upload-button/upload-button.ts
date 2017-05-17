import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, Renderer } from '@angular/core';

/**
 * Generated class for the UploadButtonComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'upload-button',
  templateUrl: 'upload-button.html'
})
export class UploadButtonComponent {

  @ViewChild("input")
  private nativeInputBtn: ElementRef;

  @Input('btnStyle') btnStyle: string;

  @Output() filesChanged = new EventEmitter();
  // public filesChanged: EventEmitter<any>;

  @Input('multiple') multiple: string;

  @Input('label') label: string;

  constructor(private renderer: Renderer) {
    // console.log('Hello UploadButtonComponent Component');
  }

  public callback(event: Event): void {
    let clickEvent: MouseEvent = new MouseEvent("click", { bubbles:true });
    this.renderer.invokeElementMethod(
      this.nativeInputBtn.nativeElement, "dispatchEvent", [clickEvent]
    );
  }

  public filesAdded(event: Event): void 
  {
    let files: FileList = this.nativeInputBtn.nativeElement.files;
    // this.filesChanged.next(files);
    this.filesChanged.emit(files);
  }

}
