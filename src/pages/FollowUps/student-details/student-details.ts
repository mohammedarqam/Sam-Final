import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-student-details',
  templateUrl: 'student-details.html',
})
export class StudentDetailsPage {

  student = this.navParams.get("student");

  days : string='';

  constructor(
  public navCtrl: NavController, 
  public db : AngularFireDatabase,
  public navParams: NavParams
  ) {
    this.days = moment(this.student.FollowUpDate, "YYYY-MM-DD").fromNow()
  }


  addUpdate(){
    this.navCtrl.push("AddFollowUpPage",{student : this.student});
  }

}
