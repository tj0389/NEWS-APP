import { ShowimagePage } from './../showimage/showimage.page';
import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  data:any;
  data1:any=null;
  news_offset="None";
  items: any;
  loading:any;
  is_load:boolean;
  // default_image="C:\Users\Tanmay Jain\Documents\news-app\src\app\home\vista-wei-lvR06Zj8P18-unsplash.jpg";

  constructor(public modalCtrl: ModalController,private file: File,public alertCtrl: AlertController,public loadingCtrl: LoadingController,private http:HttpClient,private themeableBrowser: ThemeableBrowser,private iab: InAppBrowser) {
    if (this.data1==null )
      this.load();
  }

  doRefresh(event) {
    // console.log('Begin async operation');
    this.load();
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    this.loadmore();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

 async load(){
   let url="https://newsapi389.herokuapp.com/";
    this.is_load=true;
    this.http.get(url).subscribe((res)=>{
      // console.log(res);
      try{
      this.is_load=false;
      this.data=res;
      this.news_offset=this.data.pop();
      this.news_offset=this.news_offset['id'];
      this.data1=this.data;
      }
      catch(error)
      {
        this.is_load=false;
        this.presentAlert("Something went wrong. Please Try Again")
      }
    });
  }

  loadmore(){
    let url="https://newsapi389.herokuapp.com/"+this.news_offset;
    // this.showLoader();
    this.http.get(url).subscribe((res)=>{
      try{
        // this.is_load=false;
        // this.loading.dismiss();
        this.data=res;
        this.news_offset=this.data.pop();
        this.news_offset=this.news_offset['id'];
        this.data1=this.data1.concat(this.data);
      }
      catch(error)
      {
        this.is_load=false;
        this.presentAlert("Something went wrong. Please Try Again")
      }
    });
  }
   
  async showLoader(){
      this.loading = await this.loadingCtrl.create({
        message:"Loading"
        // duration: 5000,
      });
      await this.loading.present();
    }

  runbrowser(link:any){
    const browser = this.iab.create(link);
    browser.insertCSS({ code: "{-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}"});
    
    // browser.close();
  }

  
  async presentAlert(msg:string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async openimage(link:any) {
      const modal = await this.modalCtrl.create({
        component:ShowimagePage,
        cssClass:'my-modal',
        componentProps:{
          link:link
        }
      });
      await modal.present();
  }

}
