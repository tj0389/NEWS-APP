import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

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

  constructor(public loadingCtrl: LoadingController,private http:HttpClient) {
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
   const url="https://newsapi389.herokuapp.com/";
    this.showLoader();
    this.http.get(url).subscribe((res)=>{
      // console.log(res);
      this.loading.dismiss();
      this.data=res;
      this.news_offset=this.data.pop();
      this.news_offset=this.news_offset['id'];
      // console.log(this.news_offset);
      this.data1=this.data;
      // console.log(this.data)
    });
  }

  loadmore(){
    const url="https://newsapi389.herokuapp.com/"+this.news_offset;
    this.http.get(url).subscribe((res)=>{
      this.data=res;
      this.news_offset=this.data.pop();
      this.news_offset=this.news_offset['id'];
      // console.log(this.news_offset);
      this.data1=this.data1.concat(this.data);
      // console.log(this.data)
    });
  }
    // console.log(this.news_offset[0]);
    // const ngFor=let tmp of data
    // // if (this.data1.length)
    // let arr=Array(this.data1[0])
  async showLoader(){
      this.loading = await this.loadingCtrl.create({
        message:"Loading"
        // duration: 5000,
      });
      await this.loading.present();
    }
}
