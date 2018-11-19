import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { StudentDetailsPage } from '../student-details/student-details';
import moment from 'moment';
import { AddFollowUpPage } from '../add-follow-up/add-follow-up';

@IonicPage()
@Component({
  selector: 'page-follow-up-students',
  templateUrl: 'follow-up-students.html',
})
export class FollowUpStudentsPage {

  schoolKey = this.navParams.get("schoolKey");

  students: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.getStudents();
  }

  getStudents() {
    this.db.list(`SubsIndex/Schools/${this.schoolKey}/Students`).snapshotChanges().subscribe(itemSnap => {
      itemSnap.forEach(snap => {
        this.db.object(`Organisms/Students/${snap.key}`).snapshotChanges().subscribe(iSnap => {
          var temp: any = iSnap.payload.val();

          temp.days = moment(temp.FollowUpDate, "YYYY-MM-DD").fromNow()


          temp.key = iSnap.key;
          console.log(temp)
          this.students.push(temp);
        })
      })
    })
  }

  details(s) {
    this.navCtrl.push(StudentDetailsPage, { student: s })
  }

  addUpdate(s) {
    this.navCtrl.push(AddFollowUpPage, { student: s });
  }
}
