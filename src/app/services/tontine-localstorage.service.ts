import { Injectable } from '@angular/core';
import { TontineDataService } from './tontine-data.service';
import { Observable, of } from 'rxjs';
import { Tontine } from '../models/tontine.model';
import { Investor } from '../models/investor.model';

@Injectable({
  providedIn: 'root'
})
export class TontineLocalStorageService extends TontineDataService {
  public getTontine(): Observable<Tontine> {
    return this.getTontineById('tontine');
  }

  public getTontineById(id: string): Observable<Tontine> {
    return of(JSON.parse(localStorage.getItem('tontine')));
  }

  public getInvestors(): Observable<Investor[]> {
    return this.getInvestorsOfTontine('tontine');
  }

  public getInvestorsOfTontine(tontine: string): Observable<Investor[]> {
    return of((JSON.parse(localStorage.getItem('tontine')) as Tontine).investors);
  }

  public saveTontine(tontine: Tontine) {
    localStorage.setItem('tontine', JSON.stringify(tontine));
  }
}
