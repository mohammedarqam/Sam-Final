import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { ChangePassPage } from '../../Auths/change-pass/change-pass';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  fName : string;
  lName : string;
  email : string;
  gender : string;

  loading = this.loadingCtrl.create({
    spinner: 'crescent',
    showBackdrop : false,	
  });


  constructor(
  public navCtrl: NavController, 
  public loadingCtrl : LoadingController,
  public alertCtrl : AlertController,
  public navParams: NavParams
  ) {
    this.getUser();
  }

    getUser(){
      firebase.database().ref("Anms").child(firebase.auth().currentUser.uid).once("value",snap=>{

        this.fName = snap.val().FirstName;
        this.lName = snap.val().LastName;
        this.email = snap.val().Email;
        this.gender = snap.val().Gender;
      })
    }

signOutConfirm(){
  let alert = this.alertCtrl.create({
    title: 'Confirm logout ?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Logout',
        handler: () => {
          this.signOut();
        }
      }
    ]
  });
  alert.present();
}

  signOut(){
    this.loading.present();
    firebase.auth().signOut().then(()=>{
      this.loading.dismiss();
    });
  }

  gtChangePass(){this.navCtrl.push(ChangePassPage)}
}
