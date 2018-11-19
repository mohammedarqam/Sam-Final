import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { FollowUpStudentsPage } from '../../FollowUps/follow-up-students/follow-up-students';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-follow-up',
  templateUrl: 'follow-up.html',
})
export class FollowUpPage {

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

    firebase.database().ref("Organisms/Anm Assigns").child(firebase.auth().currentUser.uid).once("value",snap=>{
      this.schools = [];
      snap.forEach(snip=>{
        let temp : any = snip.val();
        temp.key = snip.key;
        firebase.database().ref("Subs/Schools").child(temp.School).child("FollowUpDate").once("value",itemSnap=>{
          if(itemSnap.exists){
            temp.days = moment(itemSnap.val(), "YYYY-MM-DD").fromNow();
          }else{
            temp.days = "No Students";
          }
        })
        this.schools.push(temp);
        console.log(temp.days);
      })
    }).then(()=>{
        loading.dismiss();
      })      
  }
  showStudents(s){
    this.navCtrl.push(FollowUpStudentsPage,{schoolKey : s.School});
  }
}
