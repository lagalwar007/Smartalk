import { Service } from './../../services';
import { ApiProvider } from './../../providers/api/api';
import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';

import { Dashboard } from '../dashboard/dashboard';
import { UserSignup } from '../user-signup/user-signup';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@IonicPage()

@Component({
  selector: "page-user-login",
  templateUrl: "user-login.html",
  providers:[ApiProvider]
})
export class UserLogin {
  //isLoggedIn: boolean = false;
  //users: any;
  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(5)]),
    password: new FormControl('',[Validators.required])
  })

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fbp:FacebookProvider,
    public db:NativeStorage,
    public api:ApiProvider,
    public service:Service
  ){
    let fbid = this.fbp.getLoginStatus();    
    if (fbid) this.db.setItem("online", true); 
  }

  ionViewDidLoad() {
    this.service.setLoading({ 'content': "Please wait......",'duration':5000 });
    console.log("ionViewDidLoad UserLogin");
    this.db.getItem('online').then( (status:Boolean) => {
      console.log('status',status);
      if(status==true) {
        this.navCtrl.push(Dashboard);
      }else{
       
      }
    }).catch( (err) => {
      console.log(err);
    })  
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter  UserLogin");
  }
  fblogin() {
    this.fbp.userLogin(["public_profile", "user_friends", "email"]).subscribe((res)=> {
      console.log("fb_session", res);
      if (res) {
        this.db.setItem("fb_session", res);
        this.navCtrl.push(Dashboard);
      }
    })
    //this.db.setItem('fbsession_user',session);
  }
  login(){
    if(this.loginForm.valid){
      let formdata = this.loginForm.value;
      console.log(formdata);
      this.service.setLoading({'content':'Please wait'})
      this.api.loginMethod(formdata).subscribe( (res) => {
        console.log(res);
        if(res['status']==true){
          this.db.setItem('id',res['data']['id']);
          this.db.setItem("online", true); 
          this.service.setToast({message: res['msg']})
          this.service.callbackToast(() => {
            this.service.dismisLoading(500);
            this.navCtrl.push(Dashboard);
          })   
        }else{
          this.service.setToast({
            message: res['msg'],
          })    
        }
      })
    }else{
      this.service.setToast({
        message: 'Something trouble please check',
      })
      
    }
      
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
