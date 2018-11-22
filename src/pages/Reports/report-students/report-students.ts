import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-report-students',
  templateUrl: 'report-students.html',
})
export class ReportStudentsPage {

  sevs = this.navParams.get("seves")
  schoolkey = this.navParams.get("schoolkey");
  students : Array<any> = [];
  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public navParams: NavParams
  ) {
    this.getStudents();
  }
  ionViewDidEnter(){
    // this.getStudents();
  }
  getStudents(){
    let loading = this.loadingCtrl.create({
      content: 'Loading Students...'
    });
    firebase.database().ref("Counters/Schools").child(this.schoolkey).child("Severity").child(this.sevs).once("value",itemSnap=>{
      this.students = [];
      itemSnap.forEach(snippi=>{
        firebase.database().ref("Organisms/Students").child(snippi.key).once("value",itemSnapshot=>{
          var temp : any = itemSnapshot.val();
          temp.key = itemSnapshot.key;
          temp.days = moment(temp.FollowUpDate, "YYYY-MM-DD").fromNow();
          this.students.push(temp);
        })
      })
    }).then(()=>{
      loading.dismiss();
    })
  }

  details(s){
    this.navCtrl.push("StudentDetailsPage",{student :s })
  }

}
