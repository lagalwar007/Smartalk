import { Service } from './../services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { Facebook } from "@ionic-native/facebook";
import { UserLogin } from '../pages/user-login/user-login';
import { UserSignup } from '../pages/user-signup/user-signup';
import { UserForgotpassword } from '../pages/user-forgotpassword/user-forgotpassword';
import { Dashboard } from '../pages/dashboard/dashboard';
import { NativeStorage } from "@ionic-native/native-storage";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FacebookProvider } from '../providers/facebook/facebook';
import { ApiProvider } from '../providers/api/api';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,

    UserLogin,
    UserSignup,
    UserForgotpassword,
    Dashboard,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserLogin,
    UserSignup,
    UserForgotpassword,
    Dashboard,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FacebookProvider,
    ApiProvider,
    Service
  ]
})
export class AppModule {}
