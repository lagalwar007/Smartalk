import { Injectable } from '@angular/core';
import { ToastController} from 'ionic-angular/components/toast/toast-controller';
import { LoadingController,Loading } from 'ionic-angular';

@Injectable()

interface toast {
   message  : String,
   duration : Number,
   position : String,
   cssClass : String  
}


export class Service {
    constructor( public toastCtrl:ToastController, public loadingCtrl: LoadingController){}
    /* ToastService */
    public toastDefaultSettings:toast = {
        message: 'User was added successfully',
        duration: 3000,
        position: 'top',
        cssClass:'toastClass'
    };
    private toast;
    getToast(){
      this.toast.present();          
    }
    setToast(toastSettings: Object){
      this.toast = this.toastCtrl.create(Object.assign(this.toastDefaultSettings,toastSettings));
      this.getToast();  
    }
    callbackToast(callbackfn:Function){
        this.toast.onDidDismiss( () => {
            callbackfn();
        })
    }
    /* ToastService */
    /* LoadingService */
    private loading:Loading;
    public loadingDefaultSettings: Object = {
        content: 'Please wait...'
    };
    setLoading(loadingSettings?:Object){
      this.loading = this.loadingCtrl.create(Object.assign(this.loadingDefaultSettings,loadingSettings));
      this.getLoading();
    }
    getLoading(){
        this.loading.present();
    }
    dismisLoading(timeOut?: Number){
        timeOut = (typeof timeOut!='undefined') ? timeOut : 5000;
        setTimeout(() => {
            this.loading.dismiss()
        }, timeOut);
    }
    /* LoadingService */
}