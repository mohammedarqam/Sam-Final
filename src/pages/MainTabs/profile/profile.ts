import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  name : string;



  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
    // this.getUser();
  }

    getUser(){
      firebase.database().ref("User Data/Users").child(firebase.auth().currentUser.uid).once("value",snap=>{
        this.name = snap.val().Name;
      })
    }

  signOut(){
    firebase.auth().signOut();
  }

}
