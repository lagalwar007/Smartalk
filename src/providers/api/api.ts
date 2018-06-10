import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiProvider {
  private url: String = 'http://weblike.890m.com/';
  constructor(public http: Http) {
    console.log('Hello ApiProvider Provider');
  }
  public loginMethod(data:Object){
    return this.http.post(this.url+'signin',data).map( res => res.json() )
  }
  public logoutMethod(id:Number){
    return this.http.post(this.url + 'logout', { id: id }).map(res => res.json())  
  }
  public loginWithFacebook(id:String){
    return this.http.post(this.url+'fblogin',JSON.stringify({ id: id }))
  }
  public signupMethod(data: Object) {
    return this.http.post(this.url + 'signup', data).map(res => res.json())
  }
}
