import { Observable, of } from 'rxjs';

import { Tontine } from '../models/tontine.model';

import { TONTINE, INVESTORS } from '../models/mock';

import { Investor } from '../models/investor.model';

export abstract class TontineDataService {
  public getTontine(): Observable<Tontine> {
    return this.getTontineById('tontine');
  }

  public getTontineById(id: string): Observable<Tontine> {
    return of(TONTINE);
  }

  public getInvestors(): Observable<Investor[]> {
    return this.getInvestorsOfTontine('tontine');
  }

  public getInvestorsOfTontine(tontine: string): Observable<Investor[]> {
    return of(INVESTORS);
  }

  public saveTontine(tontine: Tontine) {
  }
}
