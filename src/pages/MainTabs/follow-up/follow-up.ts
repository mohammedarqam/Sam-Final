import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-follow-up',
  templateUrl: 'follow-up.html',
})
export class FollowUpPage {

  fups : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
  }

}
