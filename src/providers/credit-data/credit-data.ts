import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { CreditModel } from '../../models/credit-model';

/*
  Generated class for the CreditDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CreditDataProvider {

  creditRef: AngularFireList<CreditModel>;
  transactions: Observable<CreditModel[]>;
  constructor(private db: AngularFireDatabase) {
    this.creditRef = this.db.list<CreditModel>('credito');
    this.transactions = this.creditRef.valueChanges();
  }

  public addCredit(credit: CreditModel) {
    this.creditRef.push(credit);
  }

  public getCredit():Observable<CreditModel[]> {
    return this.transactions;
  }

}
