import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';

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
  default_image="C:\Users\Tanmay Jain\Documents\news-app\src\app\home\vista-wei-lvR06Zj8P18-unsplash.jpg";

  constructor(public alertCtrl: AlertController,public loadingCtrl: LoadingController,private http:HttpClient,private themeableBrowser: ThemeableBrowser) {
    if (this.data1==null )
      this.load();
  }

  doRefresh(event) {
    // console.log('Begin async operation');

    setTimeout(() => {
      this.load();
      // console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      this.loadmore();
      // console.log('Done');
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

 async load(){
   let url="https://newsapi389.herokuapp.com/";
    this.showLoader();
    this.http.get(url).subscribe((res)=>{
      // console.log(res);
      try{
      this.loading.dismiss();
      this.data=res;
      this.news_offset=this.data.pop();
      this.news_offset=this.news_offset['id'];
      this.data1=this.data;
      }
      catch(error)
      {
        this.loading.dismiss();
        this.presentAlert("Something went wrong. Please referesh the Page")
      }
    });
  }

  loadmore(){
    let url="https://newsapi389.herokuapp.com/"+this.news_offset;
    this.http.get(url).subscribe((res)=>{
      try{
        this.data=res;
        this.news_offset=this.data.pop();
        this.news_offset=this.news_offset['id'];
        this.data1=this.data1.concat(this.data);
      }
      catch(error)
      {
        this.loading.dismiss();
        this.presentAlert("Something went wrong. Please referesh the Page")
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
    // console.log(link);

    const options: ThemeableBrowserOptions = {
      statusbar: {
          color: '#ffffffff'
      },
      toolbar: {
          height: 44,
          color: '#f0f0f0ff'
      },
      title: {
          color: '#003264ff',
          showPageTitle: true
      },
      backButton: {
          image: 'back',
          imagePressed: 'back_pressed',
          align: 'left',
          event: 'backPressed'
      },
      forwardButton: {
          image: 'forward',
          imagePressed: 'forward_pressed',
          align: 'left',
          event: 'forwardPressed'
      },
      closeButton: {
          image: 'close',
          imagePressed: 'close_pressed',
          align: 'left',
          event: 'closePressed'
      },
      customButtons: [
          {
              image: 'share',
              imagePressed: 'share_pressed',
              align: 'right',
              event: 'sharePressed'
          }
      ],
      menu: {
          image: 'menu',
          imagePressed: 'menu_pressed',
          title: 'Test',
          cancel: 'Cancel',
          align: 'right',
          items: [
              {
                  event: 'helloPressed',
                  label: 'Hello World!'
              },
              {
                  event: 'testPressed',
                  label: 'Test!'
              }
          ]
      },
      backButtonCanClose: true
    }

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(link, '_blank', options);
    
  }

  async presentAlert(msg:string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
