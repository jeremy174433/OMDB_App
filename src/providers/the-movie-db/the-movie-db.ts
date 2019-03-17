import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TheMovieDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TheMovieDbProvider {

  private _page  ;
  private APIKEY = '?api_key=0ea432d6c4053e8ee8a5574e79b0eaec&language=fr';
  private URL = 'https://api.themoviedb.org/3/movie/';
  private subscription ;

  constructor(public http: HttpClient) {
    console.log('Hello TheMovieDbProvider Provider');
  }

  GetUpcomingMovie(){
    return  new Promise ((resolve) => this.subscription = this.http.get<TheMovieDBMovie>(this.URL + "upcoming" + this.APIKEY + "&page=" + "1" ).subscribe(value =>{ resolve(value)}))
  }

  GetOtherUpcomingMovie(){
    this._page ++ ;
    return  new Promise ((resolve) => this.subscription = this.http.get<TheMovieDBMovie>(this.URL + "upcoming" + this.APIKEY + "&page=" + this._page ).subscribe(value =>{ resolve(value)}))
  }

  page(value) {
    this._page = value;
  }

  UnsubscribeAll(){this.subscription.unsubscribe()}

}
