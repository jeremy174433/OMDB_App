import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BoxofficePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boxoffice',
  templateUrl: 'boxoffice.html',
})
export class BoxofficePage {
  boxOffice: MovieBoxOffice;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {

  }

}
