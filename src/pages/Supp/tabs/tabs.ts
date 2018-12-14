import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import * as firebase from 'firebase';
import { NativeStorage } from '@ionic-native/native-storage';
import { stringify } from '@angular/compiler/src/util';


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = "ReportsPage";
  tab2Root = "ActiveJobsPage";
  tab3Root = "FollowUpPage";
  tab4Root = "ProfilePage";

  id : string;

    constructor(
      private nativeStorage: NativeStorage,
    ) {
      this.save();
  }


  save() {
    this.id = firebase.auth().currentUser.uid;
    
    
    this.nativeStorage.setItem('anmId',{ uid : this.id})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      ).then(() => {
        // this.nativeStorage.getItem('anmId')
        // .then(
        //   data => console.log(data.uid),
        //   error => console.error(error)
        // );
      });;
  }



}
