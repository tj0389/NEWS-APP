import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-showimage',
  templateUrl: './showimage.page.html',
  styleUrls: ['./showimage.page.scss'],
})
export class ShowimagePage implements OnInit {

  slideropts={
    allowSlidePrev: false,
    allowSlideNext: false,
    zoom: {
      maxRatio: 5
    }
  }

  imagelink:any;
  constructor(public domSanitizer: DomSanitizer,public navParams: NavParams,public modalCtrl: ModalController,) { 
    this.imagelink=this.navParams.get('link');
    // console.log(this.video_link);
  }

  ngOnInit() {
  }

  async modalclose(){
    // console.log("modal closed")
    await this.modalCtrl.dismiss();
    
  }

}
