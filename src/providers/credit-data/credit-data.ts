import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { CreditModel } from '../credit/credit';

/*
  Generated class for the CreditDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CreditDataProvider {

  creditRef: AngularFireList<CreditModel>;
  constructor(private db: AngularFireDatabase) {
    this.creditRef = this.db.list<CreditModel>('votacion');
  }

  public addCredit(credit: CreditModel) {
    this.creditRef.push(credit);
  }

  public getCredit(displayName: string) {
    return this.creditRef.stateChanges();
  }

}
