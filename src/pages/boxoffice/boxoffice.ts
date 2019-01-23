import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { MoviePage } from "../movie/movie";
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-boxoffice',
  templateUrl: 'boxoffice.html',
})
export class BoxofficePage {
  // CHARTS.JS
  @ViewChild('barCanvas') barCanvas:ElementRef;
  barChart: any;
  // DOM
  showCharts: boolean;
  canvas: Element;
  // DATA FROM API
  listDiscoverMovies: MovieBoxOffice;
  listMovies: any[];
  detailsMovie: MovieTMDBDetails;
  boxOffice = [];
  labelCharts = [];
  dataCharts = ["1","2","3","4"];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http: HttpClient
  ) {
  }

  // METHODS
  private getListMovies(): Observable<MovieBoxOffice> {
    return this.http.get<MovieBoxOffice>
    ('https://api.themoviedb.org/3/discover/movie?api_key=0ea432d6c4053e8ee8a5574e79b0eaec&language=fr-FR&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&primary_release_year=2018')
  }
  private getDetailsMovies(id): Observable<MovieTMDBDetails> {
    return this.http.get<MovieTMDBDetails>
    ('https://api.themoviedb.org/3/movie/' + id + '?api_key=0ea432d6c4053e8ee8a5574e79b0eaec&language=fr-FR')
  }

  private getMoviesData() {
    return new Promise((resolve, reject) => {
      this.getListMovies().subscribe(
        (data: MovieBoxOffice) => {
          this.listDiscoverMovies =
          { // we need to specify for each property the data to use
            page: data['page'],
            results: data['results'],
            total_results: data['total_results'],
            total_pages: data['total_pages'],
          }
          this.listMovies = this.listDiscoverMovies['results'];
          for(var c=0; c < this.listMovies.length; c++) {
            this.getDetailsMovies(this.listMovies[c].id).subscribe(
              (data: MovieTMDBDetails) => {
                /* function numberWithSpaces(x) {
                  var parts = x.toString().split(".");
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                  return parts.join(".");
                }
                var revenueSpace = numberWithSpaces(data['revenue']);
                var budgetSpace = numberWithSpaces(data['budget']); */
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
                this.boxOffice.push(this.detailsMovie)
              },
              (err) => {
                console.log(err)
              }
            );
          }
        },
        (error) => {
          console.log(error)
        }
      ).unsubscribe;
      resolve()
    }).then(res => {
    })
  }


  public displayCharts() {
    this.setChart();
    this.showCharts = true;
  }

  public displayArray () {
    this.showCharts = false;
  }

  public goToDetailsMovies (movie) {
    this.navCtrl.push(MoviePage, {
      id: movie.imdb_id
    });
  }

  private setChart () {
    console.log(this.boxOffice);
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ["1900"],
        datasets: [
          {
            label: "Africa",
            backgroundColor: "#3e95cd",
            data: [133]
          }, 
          {
            label: "Europe",
            backgroundColor: "#8e5ea2",
            data: [408]
          },
          {
            label: "Europe",
            backgroundColor: "#8e5ea2",
            data: [408]
          },
          {
            label: "Europe",
            backgroundColor: "#8e5ea2",
            data: [408]
          },
          {
            label: "Europe",
            backgroundColor: "#8e5ea2",
            data: [408]
          },
          {
            label: "Europe",
            backgroundColor: "#8e5ea2",
            data: [408]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Population growth (millions)'
        }
      }
  });
  }
  ngOnInit() {
    this.showCharts = false;
    this.getMoviesData();
  }

}
