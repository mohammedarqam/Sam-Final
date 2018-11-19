import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-follow-up',
  templateUrl: 'add-follow-up.html',
})
export class AddFollowUpPage {

  student = this.navParams.get("student");

  hbl: string;

  weight: string;
  height: string;


  sev: string;
  sevC: string;
  followUpDays: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    this.weight = this.student.Weight;
    this.height = this.student.Height;
    console.log(this.student);
  }

  checkData() {
    if (this.hbl) {
      if (this.weight) {
        if (this.height) {
          this.addFollowUp();
        } this.presentToast("Enter Height");
      } this.presentToast("Enter Weight");
    } else { this.presentToast("Enter HBL Level"); }
  }



  addFollowUp() {
    firebase.database().ref("Organisms/StudentFollowUp").child(this.student.key).push({
      HBL: this.hbl,
      Weight: this.weight,
      Height: this.height,
      Severity: this.sev,
      FollowUpDate: moment().add(this.followUpDays, 'day').format(),
      TimeStamp: moment().format(),
    }).then(() => {
      let stuRef = firebase.database().ref("Organisms/Students/").child(this.student.key);
      stuRef.child("Weight").set(this.weight).then(() => {
        stuRef.child("Height").set(this.height).then(() => {
          stuRef.child("HBL").set(this.hbl).then(() => {
            stuRef.child("Severity").set(this.sev).then(() => {
              stuRef.child("FollowUpDate").set(moment().add(this.followUpDays, 'day').format()).then(() => {
                this.presentToast("Follow Up Added");
                this.navCtrl.pop();
              })
            })
          })
        })
      })



    })
  }

  // this.presentToast("Follow Up Added");
  // this.navCtrl.pop();


  getSev() {
    var hbnew = +this.hbl
    if (hbnew <= 6) {
      this.sev = "Severely Anaemic";
      this.followUpDays = "30";
      this.sevC = "s";
    }
    if (hbnew == 7 || hbnew == 8) {
      this.sev = "Moderately Anaemic"
      this.followUpDays = "45";
      this.sevC = "mo";
    }
    if (hbnew == 9 || hbnew == 10) {
      this.sev = "Mildly  Anaemic"
      this.followUpDays = "45";
      this.sevC = "mi";
    }
    if (hbnew >= 11) {
      this.sev = "Healthy"
      this.followUpDays = "60";
      this.sevC = "h";
    }
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: "top",
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();
  }

}
