import { ApiProvider } from './../../providers/api/api';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Dashboard } from '../dashboard/dashboard';
import { UserLogin } from '../user-login/user-login';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';
import { Service } from '../../services';
import { ValidationErrors } from '@angular/forms/src/directives/validators';




@IonicPage()
@Component({
  selector: 'page-user-signup',
  templateUrl: 'user-signup.html',
})
export class UserSignup {

  public signupForm   = new FormGroup({
   'firstname'        : new FormControl('',[Validators.required,Validators.minLength(4)]),
   'lastname'         : new FormControl('',Validators.required),
   'email'            : new FormControl('',[Validators.required,Validators.email]),
   'password'         : new FormControl('',[Validators.required,Validators.minLength(5)]),
   'confirmpassword'  : new FormControl('',[Validators.required,this.confirmingPassword])
  })

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public service:Service,
              public api:ApiProvider){}

  private confirmingPassword(control: AbstractControl):ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.get('password').value !== control.get('confirmpassword').value) {
        return { 'confirmpassword': false }
      }
      return null;
    };
  }
  signup(){
    if(this.signupForm.valid){
      this.api.signupMethod(this.signupForm.value()).subscribe( (response : Response) => {
        if(response['status']){
          this.service.setToast({'message':response['message']});
          this.service.callbackToast( () => {
            this.navCtrl.push(UserLogin)
          })
        }else{
          this.service.setToast({ 'message': response['message'] });
        }
      })
    }else{
      this.service.setToast({ 'message': 'Bad Data' });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignup');
  }

  dashboardPage(){ this.navCtrl.push(Dashboard); }
  loginPage(){ this.navCtrl.push(UserLogin);}
  forgotPasswordPage(){ this.navCtrl.push(UserForgotpassword);}

}
