import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CreditProvider } from '../../providers/credit/credit';

/**
 * Generated class for the CargaCreditoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carga-credito',
  templateUrl: 'carga-credito.html',
})
export class CargaCreditoPage implements OnInit {
  public text: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private creditSrv: CreditProvider,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CargaCreditoPage');
  }

  ngOnInit(): void {
    this.barcodeScanner.scan().then(result => {
      this.text = result.text;
      const creditResult = this.creditSrv.addCredit(result.text);
      let alert :Alert;
      if (creditResult.amount === 0) {
        alert = this.alertCtrl.create({
          title: 'Advertencia!',
          subTitle: creditResult.message,
          buttons: [
            {
              text: 'Aceptar',
              role: 'cancel',
              handler: () => {
                this.navCtrl.push('HomePage');
              }
            }]
        });
      }
      else {
        alert = this.alertCtrl.create({
          title: 'Notificación!',
          subTitle: creditResult.message,
          buttons: [
            {
              text: 'Aceptar',
              role: 'cancel',
              handler: () => {
                this.navCtrl.push('HomePage');
              }
            }]
        });
      }
      alert.present();
    })
      .catch(error => {
        alert('error message:' + error);
      });
  }

}
