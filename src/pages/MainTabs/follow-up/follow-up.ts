import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { FollowUpStudentsPage } from '../../FollowUps/follow-up-students/follow-up-students';


@IonicPage()
@Component({
  selector: 'page-follow-up',
  templateUrl: 'follow-up.html',
})
export class FollowUpPage {

  schools : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    this.getSchools();
  }

  getSchools(){
    firebase.database().ref("Organisms/Anm Assigns").child(firebase.auth().currentUser.uid).once("value",snap=>{
      this.schools = [];
      snap.forEach(snip=>{
        var temp : any = snip.val();
        temp.key = snip.key;
        console.log(temp)
        this.schools.push(temp);
      })
    })      
  }
  showStudents(s){
    this.navCtrl.push(FollowUpStudentsPage,{schoolKey : s.School});
  }
}
