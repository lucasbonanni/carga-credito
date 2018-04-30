import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

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
export class CargaCreditoPage implements OnInit{
  private options: BarcodeScannerOptions;
  private text: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CargaCreditoPage');
  }

  ngOnInit(): void {
    this.barcodeScanner.scan().then(result => {
      this.text = result.text;
    })
    .catch(error =>{
      alert('error message:' + error);
    });
  }

}
