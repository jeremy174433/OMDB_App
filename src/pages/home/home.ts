import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { FormControl } from "@angular/forms";
import { MoviePage } from "../movie/movie";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchApi: string = '';

  private movies = [];
  private term = new FormControl();

  constructor(public navCtrl: NavController, private http: HttpClient) {

  }

  ngOnInit() {
    this.term.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .subscribe(searchTerm => {
      this.http.get(`http://www.omdbapi.com/?apikey=76b9cca4&s=${searchTerm}`)
      .subscribe((data: Movie) => {
        console.log(data);
        this.movies = data.Search;
      }).closed
    });
  }

  // detailsMovies (movie) {
  //   this.navCtrl.push(MoviePage, {
  //     id: movie.imdbID
  //   });
  // }


}
