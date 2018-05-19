import { Component, OnInit } from '@angular/core';
import { NavController, IonicPage, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { User } from 'firebase';
import { CreditModel, AMOUNTS } from '../../models/credit-model';
import { CreditDataProvider } from '../../providers/credit-data/credit-data';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  displayName: string = '';
  user: User;
  totalAmount: number = 0;

  public credit: Array<CreditModel> = [];
  public amount: number;

  constructor(
    private nav: NavController,
    private auth: AuthServiceProvider,
    private toastCtrl: ToastController,
    private creditService: CreditDataProvider,
    private barcodeScanner: BarcodeScanner) {
  }

  ngOnInit(): void {
    this.user = this.auth.getUserInfo();
    this.displayName = this.user.displayName;
    this.creditService.getCredit()
      .subscribe(
        transactions => {
          console.log(transactions);
          this.credit = transactions.filter(value => value.displayName === this.displayName);
          for (let index = 0; index < this.credit.length; index++) {
            this.totalAmount += this.credit[index].amount;
          }
          console.log(this.totalAmount);
        },
        error => this.showMessage(error),
        () => {

        }
      );
      console.log(this.totalAmount);
  }

  public logout() {
    this.auth.signOut().then(() => {
      this.nav.setRoot('LoginPage')
    });
  }

  public chargeCredit() {
    // let alert :Alert;
    this.barcodeScanner.scan().then(result => {
      const exist = AMOUNTS.filter(value => value.code.toLowerCase() === result.text.trim().toLowerCase()).length > 0;
      const isNew = this.credit.filter(value => value.creditCode === result.text.trim().toLowerCase()).length === 0;
      if (exist && isNew) {
        let credit = new CreditModel();
        const date = new Date();
        credit.amount = AMOUNTS.filter(value => value.code === result.text.trim().toLowerCase())[0].amount;
        credit.creditCode = result.text.trim().toLowerCase();
        credit.displayName = this.displayName;
        credit.date = date.toString();
        this.creditService.addCredit(credit);
      }
      else if (!exist) {
        this.showMessage('El código no es válido');
      }else if(isNew){
        this.showMessage('El código ya fué cargado');
      }
    }).catch(error => {
      this.showMessage('Ocurrión un error: '+ error);
    });
  }

  public accountStatus() {
    this.nav.push('CuentaPage');
  }

  showMessage(text:string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}
