import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

/**
 * Generated class for the MoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html',
})

export class MoviePage {

  id: number;
  moviedetails = [];
  public myAngularxQrCode: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.myAngularxQrCode = 'this.moviedetails.Website';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviePage');
  }

  ngOnInit() {
    this.http.get('http://www.omdbapi.com/?apikey=76b9cca4&i=' + this.navParams.get('id'))
      .subscribe((data: MovieDetails[]) => {
        this.moviedetails = data;
        console.log(this.moviedetails);
      });
  }


}
