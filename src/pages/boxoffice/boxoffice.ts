import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

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
  listDiscoverMovies: MovieBoxOffice;
  listMovies: object[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http: HttpClient,
    private alertCtrl : AlertController,
  ) {
  }

  ngOnInit() {
    this.getListMovies().subscribe(
      (data: MovieBoxOffice) => {
        this.listDiscoverMovies =
        { // we need to specify for each property the data to use
          page: data['page'],
          results: data['results'],
          total_results: data['total_results'],
          total_pages: data['total_pages'],
        }
        this.listMovies = this.listDiscoverMovies['results']
        this.listMovies.forEach(function (data: any) {
          console.log('Title: ' + data.original_title + ' ID: ' + data.id)
        });
      },
      (error) => {
        console.log(error)
      }
    );
  }

  public getListMovies(): Observable<MovieBoxOffice> {
    return this.http.get<MovieBoxOffice>
    ('https://api.themoviedb.org/3/discover/movie?api_key=0ea432d6c4053e8ee8a5574e79b0eaec&language=fr-FR&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&primary_release_year=2018')
  }

}
