import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { MoviePage } from "../movie/movie";
import { MoviesProvider } from "../../providers/movies/movies";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchApi: string = '';
  apiKey: string = '';
  movies = [];
  private term = new FormControl();

  constructor(public navCtrl: NavController, private http: HttpClient, private MoviesProvider: MoviesProvider) {

  }

  getApiKey () {
    this.apiKey = this.MoviesProvider.setProvider();
  }

  detailsMovies (movie) {
    this.navCtrl.push(MoviePage, {
      id: movie.imdbID
    });
  }

  ngOnInit() {
    this.getApiKey();
    this.term.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .subscribe(searchTerm => {
      this.http.get(`http://www.omdbapi.com/?apikey=` + this.apiKey + `&s=${searchTerm}`)
      .subscribe((data: Movie) => {
        console.log(data);
        this.movies = data.Search;
      }).closed
    });
  }

}
