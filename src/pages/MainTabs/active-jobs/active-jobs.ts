import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { DataEntryPage } from '../../ActiveJobs/data-entry/data-entry';


@IonicPage()
@Component({
  selector: 'page-active-jobs',
  templateUrl: 'active-jobs.html',
})
export class ActiveJobsPage {

  schools : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    this.getSchools();
  }
  getSchools(){
    firebase.database().ref("Anm Assigns").child(firebase.auth().currentUser.uid).once("value",snap=>{
      this.schools = [];
      snap.forEach(snip=>{
        var temp : any = snip.val();
        temp.key = snip.key;
        console.log(temp)
        this.schools.push(temp);
      })
    })      
  }

  addData(s){
    this.navCtrl.push(DataEntryPage,{school : s})
  }


}
