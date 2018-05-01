import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;
  registerCredentials = { email: '', password: '' };
  private : ActionSheetController;
  constructor(
    private nav: NavController, 
    private auth: AuthServiceProvider, 
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {
    this.showLoading()
    this.auth.signInWithEmail(this.registerCredentials).then(allowed => {
      console.log(allowed);
        this.nav.setRoot('HomePage');
    }).catch(error=>{
      alert(error);
      this.loading.dismiss();
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Se produjo un error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  loginWithGithub(){
    this.auth.signInWithGithub().then(() =>{
      this.nav.setRoot('HomePage');
    }).catch(error =>{
      alert(error);
    });;
  }

  loginWithGoogle(){
    this.auth.signInWithGoogle().then(() =>{
      this.nav.setRoot('HomePage');
    }).catch(error =>{
      alert(error);
    });
  }
}
