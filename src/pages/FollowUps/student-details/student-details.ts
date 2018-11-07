import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-student-details',
  templateUrl: 'student-details.html',
})
export class StudentDetailsPage {

  student = this.navParams.get("student");


  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    console.log(this.student);
  }


}
