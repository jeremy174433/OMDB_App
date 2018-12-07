import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  public photos : any;
  myPictures: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private camera: Camera, private alertCtrl : AlertController) {
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

      this.photos = [];
  }

  openCamera() {
    let confirm = this.alertCtrl.create({
      title: 'Open the camera ?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');

            const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE
            }

            this.camera.getPicture(options).then((imageData) => {
              this.myPictures = 'data:image/jpeg;base64,' + imageData;
            }, (err) => {
              console.log(err);
            });
          }
        }
      ]
    });
    confirm.present();
  }


}