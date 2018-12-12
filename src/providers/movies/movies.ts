import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoviesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoviesProvider {

  private apikey = '76b9cca4';

  constructor(public http: HttpClient) {
  }

  setProvider() {
    return this.apikey
  }


}
