import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-change-pass',
  templateUrl: 'change-pass.html',
})
export class ChangePassPage {

  cpass: string;
  npass : string;
  npass2 : string;
  oPass : string;

  constructor(
  public navCtrl: NavController, 
  public toastCtrl : ToastController,
  public navParams: NavParams
  ) {
  }

  getUser(){
    firebase.database().ref("Anms").child(firebase.auth().currentUser.uid).once("value",snap=>{
      this.oPass = snap.val().Password;
      console.log(this.oPass);
    })
  }

  checkData(){
    
  }






  changePass(){
      firebase.auth().currentUser.updatePassword(this.npass).then(()=>{
        firebase.database().ref("Anms").child(firebase.auth().currentUser.uid).child("Password").set(this.npass).then(()=>{
          this.presentToast("Password Changed");
        })
      })
    }






  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      position : "top",
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();
  }

}
