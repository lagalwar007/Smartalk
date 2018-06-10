import { ApiProvider } from './../providers/api/api';
import { Service } from './../services';
import { NativeStorage } from '@ionic-native/native-storage';
import { StatusBar } from '@ionic-native/status-bar';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';

import { UserLogin } from '../pages/user-login/user-login';
import { Dashboard } from '../pages/dashboard/dashboard';

import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = UserLogin;
  pages: Array<{title: string,icon:string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public db:NativeStorage,
    public service:Service,
    public api:ApiProvider
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Dashbaord',icon:'home', component: Dashboard },
      { title: 'Logout',icon:'lock', component: UserLogin }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if(page.title == 'Logout'){
      this.db.getItem('id').then((id: Number) => {
        this.api.logoutMethod(id).subscribe((response) => {
          if (response['status'] == true) {
            this.service.setLoading({ 'content': 'Please wait.....' });
            this.db.remove('id');
            this.db.setItem('online',false).then(() => {
              this.service.setToast({ 'message': response['msg'] });
              this.service.callbackToast(() => {
                this.service.dismisLoading(500);
                this.nav.setRoot(page.component);
              })
            }).catch((error) => {
              console.log(error); 
              this.service.dismisLoading();
              })
            
          }else{
            this.service.setToast({'message':response['msg']});
            this.service.callbackToast( () => {
              console.log('hei');
            })
          }
        })
      }).catch( () => {
        console.log('error');
      })
    }else{
      this.nav.setRoot(page.component);
    }
  }
}
