import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the CreditDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CreditDataProvider {

  constructor(private db: AngularFireDatabase) {
    // this.votesRef = this.db.list<voteModel>('votacion');
    // this.votes = this.votesRef.valueChanges();
  }

}
