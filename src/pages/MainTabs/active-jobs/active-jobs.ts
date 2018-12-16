import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import * as firebase from 'firebase';
import { NativeStorage } from '@ionic-native/native-storage';


@IonicPage()
@Component({
  selector: 'page-active-jobs',
  templateUrl: 'active-jobs.html',
})
export class ActiveJobsPage {

  schools: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
  ) {
    this.getSchools();
  }

  ionViewDidEnter() {
    this.getSchools();
  }

  getSchools() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    firebase.database().ref("Organisms/Anm Assigns").child(firebase.auth().currentUser.uid).once("value", snap => {
      this.schools = [];
      snap.forEach(snip => {
        var temp: any = snip.val();
        temp.key = snip.key;
        this.schools.push(temp);
        this.nativeStorage.setItem("totSchools", { Tot: this.schools.length }).then(() => {
          this.nativeStorage.getItem('totSchools').then(
            data => console.log("Total Offline Schools" + data.Tot),
          )
        })
        for (let i = 0; i < this.schools.length; i++) {
          console.log("school" + i);
          this.nativeStorage.setItem('school' + i, {
            SchoolName: this.schools[i].SchoolName,
            Mandal: this.schools[i].Mandal,
            School: this.schools[i].School,
            Village: this.schools[i].Village,
            key: this.schools[i].key,
          }).then(() => [
            this.nativeStorage.getItem('school' + i).then(
              data => console.log(data.SchoolName)
            )
          ])
        }
      })


    }).catch((e) => {
      loading.dismiss();
    }).then(() => {
      loading.dismiss();
    })
  }



  addData(s) {
    this.navCtrl.push("DataEntryPage", { school: s })
  }


  synk() {
      let tempArr: Array<any> = [];
      let totSchls : number;
      let students : Array<any> = [];

      this.nativeStorage.keys().then((keys) => {
        keys.forEach(k => {
          tempArr.push(k);

          //Cleaned Total Schools Variable
          var i1 = tempArr.indexOf('totSchools');
          if (i1 > -1) { tempArr.splice(i1, 1); }

          //Cleaned Uid
          var i2 = tempArr.indexOf('anmId');
          if (i2 > -1) { tempArr.splice(i2, 1); }
          //Cleaned Schools
          for (let i = 0; i < totSchls; i++) {
            if (tempArr.indexOf('school' + i) > -1) { tempArr.splice(tempArr.indexOf('school' + i), 1); }

          }
          console.log(tempArr);
          tempArr.forEach(tempStu => {
            this.nativeStorage.getItem(tempStu)
              .then(
                data => students.push(data),

                error => console.error(error)
              );

          })

        });

      }).then(() => {
        // this.checkData();
      });


  }

}
