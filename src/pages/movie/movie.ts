import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BddProvider } from "../../providers/bdd/bdd";
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';

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
  websiteMovie: string;
  moviedetails: MovieDetails;
  public myAngularxQrCode: string = null;
  public photos : any;
  myPictures: string;
  show: boolean;
  scannedCode: BarcodeScanResult;
  response: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http: HttpClient,
    private BddProvider: BddProvider,
    private barcodeScanner: BarcodeScanner
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter(){// on vérifie si ce film est deja en favoris
    this.BddProvider.id = this.navParams.get('id')
    const promise = this.BddProvider.verification_favoris()
    promise.then(boolean_bdd => {
      if ( boolean_bdd == true ){
        this.show = true }
      else {
        this.show = false }
    })
  }


  ngOnInit() {
    this.getMovieDetails().subscribe(
      (data: MovieDetails) => {
        this.moviedetails =
        { // we need to specify for each property the data to use
          Title: data['Title'],
          Year: data['Year'],
          Rated: data['Rated'],
          Ratings: data['Ratings'],
          Released: data['Released'],
          Runtime: data['Runtime'],
          Genre: data['Genre'],
          Director: data['Director'],
          Writer: data['Writer'],
          Actors: data['Actors'],
          Plot: data['Plot'],
          Language: data['Language'],
          Country: data['Country'],
          Awards: data['Awards'],
          Poster: data['Poster'],
          Metascore: data['Metascore'],
          imdbRating: data['imdbRating'],
          imdbVotes: data['imdbVotes'],
          imdbID: data['imdbID'],
          Type: data['Type'],
          DVD: data['DVD'],
          BoxOffice: data['BoxOffice'],
          Production: data['Production'],
          Website: data['Website'],
          Response: data['Response']
        }
        this.myAngularxQrCode = data['imdbID'];
        console.log(this.moviedetails);
        if (this.moviedetails.Response === 'True') {
          this.response = true;
        } else {
          this.response = false;
        }
      },
      (error) => {
        console.log(error)
      }
    );
    this.photos = [];
  }

  public getMovieDetails(): Observable<MovieDetails> {
    return this.http.get<MovieDetails>
    ('http://www.omdbapi.com/?apikey=76b9cca4&i=' + this.navParams.get('id'))
  }

  async scanCode() {
    try {
      const options: BarcodeScannerOptions = {
        prompt: 'Diriger votre caméra vers un QRCode',
        torchOn: true
      }
      this.scannedCode = await this.barcodeScanner.scan(options);
    } catch (error) {
      console.log(error);
    }
  }

  ajout_en_bdd(MovieTitle , MoviePoster , MovieID) {
    this.show = true; 
    this.BddProvider.ajout_en_bdd(MovieTitle , MoviePoster , MovieID);
  }

  supprimer_de_bdd(MovieID) {
    this.show = false;
    this.BddProvider.supprimer_de_bdd(MovieID);
  }

}