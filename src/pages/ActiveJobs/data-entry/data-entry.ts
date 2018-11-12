import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DataConfirmPage } from '../data-confirm/data-confirm';


@IonicPage()
@Component({
  selector: 'page-data-entry',
  templateUrl: 'data-entry.html',
})
export class DataEntryPage {

  skl = this.navParams.get("school");
  public base64Image: string;

  sname: string;
  pname: string;
  mobile: string;
  dob: string;
  class: string;
  height: string;
  weight: string;
  hbl: string;
  aadhar: string;
  address: string;
  cmmu: string;
  followUpDays: string;

  age: number;
  sev: string;
  sevC: string;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    console.log(this.skl);
  }

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  checkData() {
    if (this.sname) {
      if (this.pname) {
        if (this.mobile) {
          if (this.age > 10) {
            if (this.class) {
              if (this.height) {
                if (this.weight) {
                  if (this.hbl) {
                    if (this.aadhar) {
                      if (this.address) {
                        if (this.cmmu) {
                          this.enterData();
                        } else { this.presentToast("Enter community"); }
                      } else { this.presentToast("Enter Address"); }
                    } else { this.presentToast("Aadhar Number Not Valid"); }
                  } else { this.presentToast("Enter HB Level"); }
                } else { this.presentToast("Enter Weight"); }
              } else { this.presentToast("Enter Height"); }
            } else { this.presentToast("Enter class"); }
          } else { this.presentToast("Age not Valid"); }
        } else { this.presentToast("Mobile Number not Valid"); }
      } else { this.presentToast("Enter Parent Name"); }
    } else { this.presentToast("Enter Student Name"); }
  }

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

  clear() {
    this.sname = null;
    this.pname = null;
    this.mobile = null;
    this.dob = null;
    this.class = null;
    this.height = null;
    this.weight = null;
    this.hbl = null;
    this.aadhar = null;
    this.address = null;
    this.cmmu = null;


    this.age = null;
    this.sev = null;

  }

  enterData() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    firebase.database().ref("Organisms/Students").push({
      StudentName: this.sname,
      ParentName: this.pname,
      Mobile: this.mobile,
      DOB: this.dob,
      Class: this.class,
      Height: this.height,
      Weight: this.weight,
      HBL: this.hbl,
      Aadhar: this.aadhar,
      Address: this.address,
      Community: this.cmmu,
      Age: this.age,
      Severity: this.sev,
      EntryDate: moment().format(),
      FollowUpDate: moment().add(this.followUpDays, 'day').format(),
      Mandal: this.skl.Mandal,
      Village: this.skl.Village,
      Schools: this.skl.School,
      ANM: firebase.auth().currentUser.uid,
    }).then((res) => {
      firebase.database().ref("SubsIndex/Schools").child(this.skl.School).child("Students").child(res.key).set(true).then(() => {
        firebase.database().ref("Counters/Schools").child(this.skl.School).child("Severity").child(this.sev).child(res.key).set(true).then(() => {
          firebase.database().ref("Counters/Mandals").child(this.skl.Mandal).child("Severity").child(this.sev).child(res.key).set(true).then(() => {
            firebase.database().ref("Counters/Villages").child(this.skl.Village).child("Severity").child(this.sev).child(res.key).set(true).then(() => {
              firebase.database().ref("Counters/Schools").child(this.skl.School).child("Community").child(this.cmmu).child(res.key).set(true).then(() => {
                firebase.database().ref("Counters/Mandals").child(this.skl.Mandal).child("Community").child(this.cmmu).child(res.key).set(true).then(() => {
                  firebase.database().ref("Counters/Villages").child(this.skl.Village).child("Community").child(this.cmmu).child(res.key).set(true).then(() => {
                    firebase.database().ref("Counters/District").child("Severity").child(this.sev).child(res.key).set(true).then(() => {
                      firebase.database().ref("Counters/District").child("Community").child(this.cmmu).child(res.key).set(true).then(() => {
                        loading.dismiss();
                        this.navCtrl.push(DataConfirmPage, { hbl: this.hbl, sev: this.sev, school: this.skl, FollowUp: moment().add(this.followUpDays, 'day').format() });

                      })
                    })
                  })
                })
              })
            })
          })
        })
      });
    })
  }




  gtFollowup() {
    console.log(moment().format('D/MMM/YYYY'))
    console.log(moment().add(45, 'day').format('D/MMM/YYYY'))
  }







  calcAge() {
    this.age = moment().diff(this.dob, 'years', false);
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
