import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Tabs, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { TabsPage } from '../../Supp/tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  phone : string;
  pass : string;




  constructor(
  public navCtrl: NavController,
  public toastCtrl : ToastController,
  public loadingCtrl : LoadingController,
  public alertCtrl : AlertController,
  ) {
  }

  checkData(){
  if(this.phone.length){
    if(this.pass){
      this.login();
    }else{
      this.presentToast("Enter Password");
    }
  }else{
    this.presentToast("Phone Number not Valid");
  }
}

login(){
  var malGen = this.phone+ "@samatha.anm";
  console.log(malGen)
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();
  firebase.auth().signInWithEmailAndPassword(malGen,this.pass).then(()=>{
    this.navCtrl.setRoot(TabsPage)
    loading.dismiss()
  }).catch((er)=>{
    loading.dismiss();
    var mg = er.message;
    this.presentToast(mg);
  });
}






  //Toast Function
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
