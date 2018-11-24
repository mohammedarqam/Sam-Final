import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  name : string;
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
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        this.navCtrl.setRoot("LoginPage");
      }
    })

    this.getUser();
  }

  ionViewDidEnter(){
    this.getUser();

  }

    getUser(){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
  
      firebase.database().ref("Organisms/Anms").child(firebase.auth().currentUser.uid).once("value",snap=>{
        this.name = snap.val().Name;
        this.email = snap.val().Email;
        this.gender = snap.val().Gender;
        console.log(snap.val())
      }).then(()=>{
        loading.dismiss();
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
    }).then(()=>{
      this.navCtrl.setRoot("LoginPage");
    });
  }

  gtChangePass(){this.navCtrl.push("ChangePassPage")}






  lang : string = "English";


  LangLabel : string = "Language";
  pagetitle : string = "Profile";
  changePassBtn : string = "Change Password";
  signoutBtn : string = "Sign Out";
  nameL : string = "Name";
  emailL : string = "Email";
  genderL : string = "Gender";

  changeLabels() {

    switch (this.lang) {
      case "English":
        this.LangLabel = "Language";
        this.pagetitle = "Enter Data";
        this.changePassBtn = "Change Password"
        this.signoutBtn = "Sign Out";
        this.nameL = "Name";
        this.emailL = "Email";
        this.genderL = "Gender";
        break;
      case "Telugu":
        this.LangLabel = "భాషా";
        this.pagetitle = "ప్రొఫైల్";
        this.changePassBtn = "పాస్వర్డ్ మార్చండి";
        this.signoutBtn = "సైన్ అవుట్";
        this.nameL = "పేరు";
        this.emailL = "ఇమెయిల్";
        this.genderL = "జెండర్";
        break;
    }
  }







}

