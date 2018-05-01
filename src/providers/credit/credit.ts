import { Injectable } from '@angular/core';

export class CreditModel {
  fecha: string;
  code: string;
  amount: number;
  message: string;
}

/*
  Generated class for the CreditProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CreditProvider {

  private amounts: any;
  private credit: Array<CreditModel>;

  constructor() {
    console.log('Hello CreditProvider Provider');
    this.credit = [];
    this.amounts = [
      {
        code: '8c95def646b6127282ed50454b73240300dccabc',
        amount: 10,
      },
      {
        code: 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172',
        amount: 50,
      },
      {
        code: '2786f4877b9091dcad7f35751bfcf5d5ea712b2f',
        amount: 100,
      }
    ]
  }

  public addCredit(value: string): CreditModel {
    let creditresult = new CreditModel();
    let amount = this.amounts.filter(x => x.code === value)[0];
    if (this.credit.filter(x => x.code === value).length > 0) {
      creditresult.message = 'El codigo ya fué cargado';
      creditresult.amount = 0;
    }
    else {
      const date = new Date();
      creditresult.amount = amount.amount;
      creditresult.message = 'Se acreditaron ' + amount.amount + ' pesos';
      creditresult.fecha = date.toLocaleDateString();
      creditresult.code = value;
      this.credit.push(creditresult);
    }
    return creditresult;
  }

  /**
   * returnCredit
 :Array<CreditModel>  */
  public returnCredit(): Array<CreditModel> {
    return this.credit;
  }

}
