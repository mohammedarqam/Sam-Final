import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { HttpClient } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { stringify } from '@angular/compiler/src/util';

@IonicPage()
@Component({
  selector: 'page-offline-data-entry',
  templateUrl: 'offline-data-entry.html',
})
export class OfflineDataEntryPage {


  skl = this.navParams.get("school");
  public base64Image: string;
  public upImage: string;

  lang: string = "English";

  sname: string;
  pname: string;
  mobile: string;
  dob: string;
  class: string;
  height: string;
  weight: string;
  hbl: string;
  aadhar: string;
  address: string;
  cmmu: string;
  followUpDays: string;

  age: number;
  sev: string;
  sevC: string;
  url: any;





  load = this.loadingCtrl.create({
    content: 'Please wait...'
  });


  public fUpDate: string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public cam: Camera,
    private http: HttpClient,
    private nativeStorage: NativeStorage,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.clear();
  }

  // takePicture() {
  //   this.cam.getPicture({
  //     destinationType: this.cam.DestinationType.DATA_URL,
  //     targetWidth: 1000,
  //     targetHeight: 1000
  //   }).then((imageData) => {
  //     // imageData is a base64 encoded string
  //     this.base64Image = "data:image/jpeg;base64," + imageData;
  //     this.upImage = imageData;

  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  checkData() {
    if (this.sname) {
      if (this.pname) {
        if (this.mobile) {
          if (this.age > 10) {
            if (this.class) {
              if (this.height) {
                if (this.weight) {
                  if (this.hbl) {
                    if (this.aadhar) {
                      if (this.address) {
                        if (this.cmmu) {
                          // this.enterData();
                        } else { this.presentToast("Enter community"); }
                      } else { this.presentToast("Enter Address"); }
                    } else { this.presentToast("Aadhar Number Not Valid"); }
                  } else { this.presentToast("Enter HB Level"); }
                } else { this.presentToast("Enter Weight"); }
              } else { this.presentToast("Enter Height"); }
            } else { this.presentToast("Enter class"); }
          } else { this.presentToast("Age not Valid"); }
        } else { this.presentToast("Mobile Number not Valid"); }
      } else { this.presentToast("Enter Parent Name"); }
    } else { this.presentToast("Enter Student Name"); }
  }

  getSev() {
    var hbnew = +this.hbl
    if (hbnew <= 6) {
      this.sev = "Severely Anaemic";
      this.followUpDays = "30";
      this.sevC = "s";
    }
    if (hbnew == 7 || hbnew == 8) {
      this.sev = "Moderately Anaemic"
      this.followUpDays = "45";
      this.sevC = "mo";
    }
    if (hbnew == 9 || hbnew == 10) {
      this.sev = "Mildly  Anaemic"
      this.followUpDays = "45";
      this.sevC = "mi";
    }
    if (hbnew >= 11) {
      this.sev = "Healthy"
      this.followUpDays = "60";
      this.sevC = "h";
    }
  }

  clear() {
    this.sname = null;
    this.pname = null;
    this.mobile = null;
    this.dob = null;
    this.class = null;
    this.height = null;
    this.weight = null;
    this.hbl = null;
    this.aadhar = null;
    this.address = null;
    this.cmmu = null;


    this.age = null;
    this.sev = null;

  }

  // getSchool() {
  //   firebase.database().ref("Subs/Schools").child(this.skl.School).once("value", items => {
  //     let pDate = items.val().FollowUpDate;
  //     let sDate = moment().add(this.followUpDays, 'day').format();
  //     let des = moment(sDate).isBefore(moment(pDate));
  //     if (des) {
  //       firebase.database().ref("Subs/Schools").child(this.skl.School).child("FollowUpDate").set(sDate).then(() => {
  //         this.load.dismiss();
  //         this.navCtrl.push("DataConfirmPage", { hbl: this.hbl, sev: this.sev, school: this.skl, FollowUp: moment().add(this.followUpDays, 'day').format() });

  //       });
  //     } else {
  //       this.load.dismiss();
  //       this.navCtrl.push("DataConfirmPage", { hbl: this.hbl, sev: this.sev, school: this.skl, FollowUp: moment().add(this.followUpDays, 'day').format() });

  //     }
  //   })
  // }

  lKey: string;

  genKey() {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP123456789";
    var pass = "";
    for (var x = 0; x < 12; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    this.lKey = pass;
    console.log(this.lKey)
  }




  enterData() {

    this.load.present();
     let id : string;
        this.nativeStorage.getItem('anmId')
        .then(
          data => id =data.uid,
          error => console.error(error)
        );

    this.genKey();
    this.nativeStorage.setItem(this.lKey, { 
          StudentName: this.sname,
          ParentName: this.pname,
          Mobile: this.mobile,
          DOB: this.dob,
          Class: this.class,
          Height: this.height,
          Weight: this.weight,
          HBL: this.hbl,
          Aadhar: this.aadhar,
          Address: this.address,
          Community: this.cmmu,
          Age: this.age,
          Severity: this.sev,
          EntryDate: moment().format(),
          FollowUpDate: moment().add(this.followUpDays, 'day').format(),
          Mandal: this.skl.Mandal,
          Village: this.skl.Village,
          Schools: this.skl.School,
          ANM: id,
    })
      .then(
        () => this.presentToast('Student Added!'),
        error => this.presentToast('Error storing item'+ error)
      ).then(()=>{
        this.load.dismiss();
        this.navCtrl.push("OfflineDataConfirmPage", { hbl: this.hbl, sev: this.sev, school: this.skl });
      });;


  //   firebase.storage().ref("Students/" + this.sname).putString(this.upImage, 'base64').catch((e) => {
  //   }).then(() => {
  //     firebase.storage().ref("Students/" + this.sname).getDownloadURL().then((dURL) => {
  //       this.url = dURL;
  //     }).then(() => {




  //       firebase.database().ref("Organisms/Students").push({
  //         StudentName: this.sname,
  //         ParentName: this.pname,
  //         Mobile: this.mobile,
  //         DOB: this.dob,
  //         Class: this.class,
  //         Height: this.height,
  //         Weight: this.weight,
  //         HBL: this.hbl,
  //         Aadhar: this.aadhar,
  //         Address: this.address,
  //         Community: this.cmmu,
  //         Age: this.age,
  //         Severity: this.sev,
  //         EntryDate: moment().format(),
  //         FollowUpDate: moment().add(this.followUpDays, 'day').format(),
  //         Mandal: this.skl.Mandal,
  //         Village: this.skl.Village,
  //         Schools: this.skl.School,
  //         ANM: firebase.auth().currentUser.uid,
  //         Image: this.url,
  //       }).then((res) => {
  //         firebase.database().ref("SubsIndex/Schools").child(this.skl.School).child("Students").child(res.key).set(true).then(() => {
  //           firebase.database().ref("Counters/Schools").child(this.skl.School).child("Severity").child(this.sev).child(res.key).set(true).then(() => {
  //             firebase.database().ref("Counters/Mandals").child(this.skl.Mandal).child("Severity").child(this.sev).child(res.key).set(true).then(() => {
  //               firebase.database().ref("Counters/Villages").child(this.skl.Village).child("Severity").child(this.sev).child(res.key).set(true).then(() => {
  //                 firebase.database().ref("Counters/Schools").child(this.skl.School).child("Community").child(this.cmmu).child(res.key).set(true).then(() => {
  //                   firebase.database().ref("Counters/Mandals").child(this.skl.Mandal).child("Community").child(this.cmmu).child(res.key).set(true).then(() => {
  //                     firebase.database().ref("Counters/Villages").child(this.skl.Village).child("Community").child(this.cmmu).child(res.key).set(true).then(() => {
  //                       firebase.database().ref("Counters/District").child("Severity").child(this.sev).child(res.key).set(true).then(() => {
  //                         firebase.database().ref("Counters/District").child("Community").child(this.cmmu).child(res.key).set(true).then(() => {
  //                           this.sendSMS();
  //                           this.load.dismiss();
  //                           this.navCtrl.push("DataConfirmPage", { hbl: this.hbl, sev: this.sev, school: this.skl });
  //                         })
  //                       })
  //                     })
  //                   })
  //                 })
  //               })
  //             })
  //           })
  //         });
  //       });



  //     });
  //   });

  }


  


  // sendSMS() {
  //   let urr1 = "http://api.msg91.com/api/sendhttp.php?country=91&sender=SAMTHA&route=4&mobiles="
  //   let phone = this.mobile;
  //   let urr2 = "&authkey=248515ASS3bXdTM6iH5bf6582b&message=1. రెడ్డిగారు. మీ కూతురు శ్రీలత తెలంగాణ ప్రభుత్వ అనిమీషియా నిర్మూలన వారిచే అనిమియోబి ( రక్తహీనత ) ఉంది అని నిర్ధారించారు.2. అనీమియా ద్వారా వచ్చే రక్త బలహీనతతో మీ బిడ్డ అలసిపోయి, ఎదుగుదల మరియు కాన్సెన్ట్రేషన్ దేనిపైనా కూడా చేయలేదు.3. శ్రీలత బాగుండటానికి మీరు ఆమెకు ఇవ్వవల్సినవి పాలకూర, మేతికూర, బీట్ రూట్, అరటిపండ్లు, మొలకెత్తిన పెసర్లు, కర్జూరము, నట్స్, చేపలు, మాంసము, లివర్ మరియు నువ్వుల, లడ్డు";
  //   let fU = urr1 + phone + urr2;
  //   this.http.get(fU, {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  //     },
  //   }).subscribe(snip => {
  //   })
  // }






  calcAge() {
    this.age = moment().diff(this.dob, 'years', false);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: "top",
      duration: 4000,
      showCloseButton: false,
    });
    toast.present();
  }


  nameL: string = "Student Name";
  pnameL: string = "Parent Name";
  mobileL: string = "Mobile";
  dobL: string = "Date of Birth";
  classL: string = "Class";
  heightL: string = "Height in Inches";
  weightL: string = "Weight in Kgs";
  hblL: string = "HB Level";
  aadharL: string = "Aadhar Number";
  addressL: string = "Residential Address";
  cmmuL: string = "Community";
  LangLabel : string = "Language";
  picBtn  :string="Take Picture";
  pagetitle : string = "Enter Data";
  submit :string = "Submit";
  changeLabels() {

    switch (this.lang) {
      case "English":
        this.nameL = "Student Name";
        this.pnameL = "Parent Name";
        this.mobileL = "Mobile";
        this.dobL = "Date of Birth";
        this.classL = "Class";
        this.heightL = "Height in Inches";
        this.weightL = "Weight in Kgs";
        this.hblL = "HB Level";
        this.aadharL = "Aadhar Number";
        this.addressL = "Residential Address";
        this.cmmuL = "Community";
        this.LangLabel = "Language";
        this.picBtn = "Take Picture";
        this.pagetitle = "Enter Data";
        this.submit = "Submit";
        break;
      case "Telugu":
        this.nameL = "పేరు";
        this.pnameL = "తల్లి/తండ్రి పేర్లు";
        this.mobileL = "మొబైల్ సంఖ్య";
        this.dobL = "పుట్టిన తేదీ";
        this.classL = "తరగతి ";
        this.heightL = "ఎత్తు in Inches";
        this.weightL = "బరువు in Kgs";
        this.hblL = "హిమోగ్లోబిన్ స్థాయి";
        this.aadharL = "ఆధార్ సంఖ్య ";
        this.addressL = "ఇంటి చిరునామా ";
        this.cmmuL = "సంఘం";
        this.LangLabel = "భాషా";
        this.picBtn = "చిత్రం తీసుకోండి";
        this.pagetitle = "డేటాను నమోదు";
        this.submit = "సమర్పించండి";
        break;
    }
  }




}
