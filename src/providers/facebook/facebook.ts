import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import "rxjs/add/observable/fromPromise";
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FacebookProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FacebookProvider {
  //public users;
  constructor(public http: Http, private fb: Facebook) {}
  getLoginStatus() {
    this.fb
      .getLoginStatus()
      .then((res: FacebookLoginResponse) => {
        console.log(res.authResponse);
        if (res.status === "connect") {
          return res.authResponse.userID;
        } else {
          return false;
        }
      })
      .catch(e => {
        return e;
      });
    console.log("Hello FacebookProvider Provider");
  }
  userLogin(permissons: string[]){
    console.log('permissons',permissons)
    return Observable.create(observer => {
      this.fb
        .login(permissons)
        .then((res: FacebookLoginResponse) =>{ observer.next(res)})
        .catch(e => console.log(e));
    });
  }
  getUserDetail(userid,entity:string[],permissons:string[]) {
    let entities = entity.join(',');
    this.fb
      .api("/" + userid + "/?fields="+entities, permissons)
      .then(res => {
        return res;
        //this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }
  logout() {
    this.fb
      .logout()
      .then(res => {return true;})
      .catch(e => console.log("Error logout from Facebook", e));
  }
}

