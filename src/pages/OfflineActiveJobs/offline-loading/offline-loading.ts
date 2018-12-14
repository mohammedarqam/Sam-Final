import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-offline-loading',
  templateUrl: 'offline-loading.html',
})
export class OfflineLoadingPage {

  bs: Array<any> = [];
  keys: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    public platform: Platform,
    public navParams: NavParams
  ) {
    this.platform.ready().then(() => {
      // this.getOffData();
    });
  }

  getOffData() {
    this.nativeStorage.getItem('anmId')
      .then(
        data => console.log(data.uid),
        error => console.error(error)
      ).then(() => {
        let tot = 0;

        this.nativeStorage.getItem('totSchools').then(
          data => tot = data.Tot,
        ).then(() => {
          console.log(tot);
          for (let i = 0; i < tot; i++) {
            this.nativeStorage.getItem('school' + i).then(
              data => console.log("School Name" + data.SchoolName + " Village :" + data.key)
            )
          }

        })

      });
  }


  getStudents() {
    this.bs = [];
    this.nativeStorage.keys().then((keys) => {
      keys.forEach(k => {
        console.log(k)
        this.nativeStorage.getItem(k)
          .then(
            data => this.bs.push(data),

            error => console.error(error)
          );

      })
    });
  }
  totSchls: number;
  cleanBS() {
    this.bs = [];
    this.nativeStorage.getItem('totSchools').then(
      data => this.totSchls = data.Tot
    )
    this.nativeStorage.keys().then((keys) => {
      keys.forEach(k => {
        this.keys.push(k);

        //Cleaned Total Schools Variable
        var i1 = this.keys.indexOf('totSchools');
        if (i1 > -1) {this.keys.splice(i1, 1);}

        //Cleaned Uid
        var i2 = this.keys.indexOf('anmId');
        if (i2 > -1) {this.keys.splice(i2, 1);}

        //Cleaned Schools
        for (let i = 0; i < this.totSchls; i++) {
          console.log("school" + i);
          if (this.keys.indexOf('school'+i) > -1) {this.keys.splice(this.keys.indexOf('school'+i) , 1);}

        }



      
      })
    });
    this.getStudents();

  }

  // checkAuth(){
  //           this.nativeStorage.getItem('anmId')
  //       .then(
  //         data => console.log("Loading Offline uid"+data.uid),
  //         error => console.error(error)
  //       );

  // }
}
