import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { MoviePage } from "../movie/movie";
import { MoviesProvider } from "../../providers/movies/movies";
import { TheMovieDbProvider} from "../../providers/the-movie-db/the-movie-db";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  MovieUpComing: TheMovieDBMovie[] = [] ;
  isMovies: boolean;
  searchApi: string = '';
  apiKey: string = '';
  movies = [];
  private inputSearch = new FormControl();

  constructor(public navCtrl: NavController, private http: HttpClient, private MoviesProvider: MoviesProvider , private TheMovieDbProvider: TheMovieDbProvider) {

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
    this.isMovies = false;
    this.getApiKey();
    this.inputSearch.valueChanges
    .debounceTime(500)
    .distinctUntilChanged()
    .subscribe(
      (searchTerm) => {
        this.http.get(`http://www.omdbapi.com/?apikey=` + this.apiKey + `&s=${searchTerm}`)
        .subscribe(
          (data: Movie) => {
            if (data.Response === 'True') {
              console.log(data);
              this.movies = data.Search;
              this.isMovies = true;
            } else { 
              this.isMovies = false; 
            }
          },
          (errorApi) => {
            console.log('erreur api');
            console.log(errorApi);
            this.isMovies = false;
          }
        ).closed
      },
      (error) => {
        console.log('erreur subscribe form control');
        console.log(error);
        this.isMovies = false;
      }
    ).closed
  }

  ionViewWillEnter(){
    // @ts-ignore
    this.TheMovieDbProvider.page(1) ;
    // @ts-ignore
    this.TheMovieDbProvider.GetUpcomingMovie().then(value => this.MovieUpComing = value.results ) ;
  }

  ionViewWillLeave(){this.TheMovieDbProvider.UnsubscribeAll()}



  doInfinite(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // @ts-ignore
        this.TheMovieDbProvider.GetOtherUpcomingMovie().then(value => value.results.forEach(value => this.MovieUpComing.push(value)));
        resolve();
      }, 500);
    })
  }

}
