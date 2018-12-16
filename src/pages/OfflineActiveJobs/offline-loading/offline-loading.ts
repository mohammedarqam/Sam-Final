import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { ActiveJobsPage } from '../../MainTabs/active-jobs/active-jobs';
import { OfflineActiveJobsPage } from '../offline-active-jobs/offline-active-jobs';

@IonicPage()
@Component({
  selector: 'page-offline-loading',
  templateUrl: 'offline-loading.html',
})
export class OfflineLoadingPage {

  totSchls: number;
  anmI: string;
  skls: Array<any> = [];

  students: Array<any> = [];


  constructor(
    public navCtrl: NavController,
    private nativeStorage: NativeStorage,
    public platform: Platform,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.platform.ready().then(() => {
      this.getOffData();
    });
  }

  getOffData() {
    let loading = this.loadingCtrl.create({
      content: 'Getting Offline Data...',
    });

    loading.present();

    this.nativeStorage.getItem('anmId')
      .then(
        data => this.anmI = data.uid,
        error => loading.dismiss(),
      ).then(() => {

        this.nativeStorage.getItem('totSchools').then(
          data => this.totSchls = data.Tot,
          error => loading.dismiss(),
        ).then(() => {
          this.skls = [];
          for (let i = 0; i < this.totSchls; i++) {
            this.nativeStorage.getItem('school' + i).then(
              data => this.skls.push(data)
            )
          }

        }).then(() => {
          loading.dismiss();
          this.checkData();
        })

      })
  }




  // getStudents() {
  //   let tempArr: Array<any> = [];

  //   this.nativeStorage.keys().then((keys) => {
  //     keys.forEach(k => {
  //       tempArr.push(k);

  //       //Cleaned Total Schools Variable
  //       var i1 = tempArr.indexOf('totSchools');
  //       if (i1 > -1) { tempArr.splice(i1, 1); }

  //       //Cleaned Uid
  //       var i2 = tempArr.indexOf('anmId');
  //       if (i2 > -1) { tempArr.splice(i2, 1); }
  //       //Cleaned Schools
  //       for (let i = 0; i < this.totSchls; i++) {
  //         if (tempArr.indexOf('school' + i) > -1) { tempArr.splice(tempArr.indexOf('school' + i), 1); }

  //       }
  //       console.log(tempArr);
  //       tempArr.forEach(tempStu => {
  //         this.nativeStorage.getItem(tempStu)
  //           .then(
  //             data => this.students.push(data),

  //             error => console.error(error)
  //           );

  //       })

  //     });

  //   }).then(() => {
  //     this.checkData();
  //   });

  // }











  checkData() {
    let loading = this.loadingCtrl.create({
      content: 'Checking Offline Data...',
    });

    loading.present();

    if (this.anmI) {

      if (this.totSchls) {

        this.navCtrl.setRoot(OfflineActiveJobsPage);
        loading.dismiss();
      } else {
        loading.dismiss();
      }

    } else {
      loading.dismiss();
    }



  }






  // checkAuth(){
  //           this.nativeStorage.getItem('anmId')
  //       .then(
  //         data => console.log("Loading Offline uid"+data.uid),
  //         error => console.error(error)
  //       );

  // }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });

    toast.present();
  }

}
