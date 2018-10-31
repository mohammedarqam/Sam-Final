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

  name : string;

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
  }

    getUser(){
      firebase.database().ref("User Data/Users").child(firebase.auth().currentUser.uid).once("value",snap=>{
        this.name = snap.val().Name;
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
