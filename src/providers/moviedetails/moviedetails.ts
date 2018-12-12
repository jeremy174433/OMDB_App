import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http,Response} from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class MoviedetailsProvider {

  private postsURL ="http://www.omdbapi.com/?apikey=76b9cca4&s=Batman";

  constructor(public http: HttpClient) {
  }
  
  getPosts(): Observable<MovieDetails[]>{
      return this.http
      .get(this.postsURL)
      .map((response: Response)=> {
      return <MovieDetails[]>response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  getMovieDetailsP() {
    return this.http.get<MovieDetails[]>('http://www.omdbapi.com/?apikey=76b9cca4&i=tt0096895');
  }

}