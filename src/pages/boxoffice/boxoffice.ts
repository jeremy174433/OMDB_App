import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  detailsMovie: MovieTMDBDetails;
  boxOffice = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http: HttpClient
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
        console.log('List of movies by discover')
        console.log(this.listMovies)
        for(var c=0; c < this.listMovies.length; c++) {
          this.getDetailsMovies(this.listMovies[c].id).subscribe(
            (data: MovieTMDBDetails) => {
              this.detailsMovie = {
                adult: data['adult'],
                backdrop_path: data['backdrop_path'],
                belongs_to_collection: data['belongs_to_collection'],
                budget: data['budget'],
                genres: data['genres'],
                homepage: data['homepage'],
                id: data['id'],
                imdb_id: data['imdb_id'],
                original_language: data['original_language'],
                original_title: data['original_title'],
                overview: data['overview'],
                popularity: data['popularity'],
                poster_path: data['poster_path'],
                production_companies : data['production_companies'],
                production_countries : data['production_countries'],
                release_date: data['release_date'],
                revenue: data['revenue'],
                runtime: data['runtime'],
                spoken_languages: data['spoken_languages'],
                status: data['status'],
                tagline: data['tagline'],
                title: data['title'],
                video: data['video'],
                vote_average: data['vote_average'],
                vote_count: data['vote_count'] 
              }
              this.boxOffice.push(this.detailsMovie);
            },
            (err) => {
              console.log(err)
            }
          );
        }
        console.log('List of movies by get details of each movie')
        console.log(this.boxOffice)
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
  public getDetailsMovies(id): Observable<MovieTMDBDetails> {
    return this.http.get<MovieTMDBDetails>
    ('https://api.themoviedb.org/3/movie/' + id + '?api_key=0ea432d6c4053e8ee8a5574e79b0eaec&language=fr-FR')
  }

}
