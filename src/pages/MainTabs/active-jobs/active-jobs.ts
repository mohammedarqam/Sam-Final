import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-active-jobs',
  templateUrl: 'active-jobs.html',
})
export class ActiveJobsPage {

  schools : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public navParams: NavParams
  ) {
    this.getSchools();
  }

  ionViewDidEnter(){
    this.getSchools();
  }

  getSchools(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    firebase.database().ref("Organisms/Anm Assigns").child(firebase.auth().currentUser.uid).once("value",snap=>{
      this.schools = [];
      snap.forEach(snip=>{
        var temp : any = snip.val();
        temp.key = snip.key;
        this.schools.push(temp);
      })
    }).then(()=>{
      loading.dismiss();
    })      
  }

  addData(s){
    this.navCtrl.push("DataEntryPage",{school : s})
  }


}
