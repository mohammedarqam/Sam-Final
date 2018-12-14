import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController, Platform } from 'ionic-angular';
import * as firebase from 'firebase';
import { OfflineDataEntryPage } from '../offline-data-entry/offline-data-entry';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-offline-active-jobs',
  templateUrl: 'offline-active-jobs.html',
})
export class OfflineActiveJobsPage {

  schools : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public navParams: NavParams,
  public platform: Platform, 
  private nativeStorage: NativeStorage,
  public popoverCtrl: PopoverController,
) {
    this.platform.ready().then(() => {
      this.getSchools();
    });
    }

  

  getSchools(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    let tot =0; 

    this.nativeStorage.getItem('totSchools').then(
      data=> tot = data.Tot,
    ).then(()=>{
      for (let i = 0; i < tot; i++) {
        this.nativeStorage.getItem('school' + i).then(
          data => this.schools.push(data)
        )
    }


    }).then(()=>{
      loading.dismiss();
    })      
  }

  addData(s){
    this.navCtrl.push("OfflineDataEntryPage",{school : s})
  }

}
