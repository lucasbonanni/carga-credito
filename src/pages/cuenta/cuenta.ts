import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreditProvider } from '../../providers/credit/credit';

/**
 * Generated class for the CuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class CuentaPage {
  public credit: Array<any> = [];
  public amount: number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private creditSrv: CreditProvider) {
      this.credit = this.creditSrv.returnCredit();
      if(this.credit.length > 0){
        for (let index = 0; index < this.credit.length; index++) {
          this.amount += this.credit[index].amount;
        }
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentaPage');
  }

}
