import { HttpClient } from '@angular/common/http';
import { TontineDataService } from './tontine-data.service';
import { Observable, of, } from 'rxjs';
import { Tontine } from '../models/tontine.model';
import { Investor } from '../models/investor.model';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://my-json-server.typicode.com/nhducseuit/choi-ho';
@Injectable({
  providedIn: 'root'
})
export class TontineHttpService extends TontineDataService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    public getTontineById(id: string): Observable<Tontine> {
      const url = `${BASE_URL}/tontines/${id}`;
      return this.httpClient.get<Tontine>(url);
    }

    public getInvestorsOfTontine(tontine: string): Observable<Investor[]> {
      const url = `${BASE_URL}/investors?tontineId=${tontine}`;
      return this.httpClient.get<Investor[]>(url);
    }

    public saveTontine(tontine: Tontine): Observable<any> {
      const url = `${BASE_URL}/tontine/${tontine.id}`;
      const savedTontine = {...tontine};
      delete savedTontine.investee;
      delete savedTontine.investors;
      console.log('saving tontine ', tontine);
      return this.httpClient.put(url, savedTontine);
    }

    public saveInvestor(investor: Investor) {
      const url = `${BASE_URL}/investor/${investor.id}`;
      console.log('Saving investor ', investor);
      return this.httpClient.put(url, investor);
    }
}
