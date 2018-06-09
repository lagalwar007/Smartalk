import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Dashboard } from '../dashboard/dashboard';
import { UserSignup } from '../user-signup/user-signup';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';
import { FacebookProvider } from '../../providers/facebook/facebook';


@IonicPage()
@Component({
  selector: "page-user-login",
  templateUrl: "user-login.html"
})
export class UserLogin {
  //isLoggedIn: boolean = false;
  //users: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fbp:FacebookProvider,
    public db:NativeStorage
  ) {
     let fbid = this.fbp.getLoginStatus();    
    if (fbid) this.db.setItem("session", fbid); 
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserLogin");
  }
  login() {
    this.fbp.userLogin(["public_profile", "user_friends", "email"]).subscribe((res)=> {
      console.log("fb_session", res);
      if (res) {
        this.db.setItem("fb_session", res);
        this.navCtrl.push(Dashboard);
      }
    })
    //this.db.setItem('fbsession_user',session);
  }
  dashboardPage() {
    this.navCtrl.push(Dashboard);
  }
  signupPage() {
    this.navCtrl.push(UserSignup);
  }
  forgotPasswordPage() {
    this.navCtrl.push(UserForgotpassword);
  }
}
