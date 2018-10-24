import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  bannersRef = this.db.list('Promotionals/Banners', ref=>ref.orderByChild("TimeStamp"));

  banners : Array<any>=[];  

  constructor(
  public navCtrl: NavController, 
  public db : AngularFireDatabase,
  public navParams: NavParams,
  ) {
    this.getBanners();
  }

  getBanners(){
    this.bannersRef.snapshotChanges().subscribe(snap=>{
      this.banners = [];
      snap.forEach(snp=>{
        let temp : any = snp.payload.val();
        temp.key = snp.key;
        console.log(temp)
      })
    })
  }

}
