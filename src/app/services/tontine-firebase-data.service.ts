import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tontine } from '../models/tontine.model';

import { TONTINE, INVESTORS } from '../models/mock';

import { Investor } from '../models/investor.model';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

export const TONTINE_ID = 'phuong-vlog';

@Injectable({
  providedIn: 'root'
})
export class TontineFirebaseDataService {

  private tontine$: Observable<Tontine>;
  private investors$: Observable<Investor[]>;

  constructor(private db: AngularFireDatabase) { }

  get tontine(): Observable<Tontine> {
    return this.tontine$
      ? this.tontine
      : this.db.list<Tontine>(
        '/tontines',
        ref => ref.orderByChild('id').equalTo(TONTINE_ID).limitToFirst(1)).valueChanges().pipe(map(tontines => tontines[0]));
  }

  get investors(): Observable<Investor[]> {
    return this.investors$
      ? this.investors$
      : this.db.list<Investor>('/investors', ref => ref.orderByChild('tontineId').equalTo(TONTINE_ID)).valueChanges();
  }

  public saveTontine(tontine: Tontine) {
  }

  public saveInvestor(investor: Investor) {

  }
}
