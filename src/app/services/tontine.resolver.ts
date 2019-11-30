import { Tontine } from './../models/tontine.model';
import { Resolve } from '@angular/router';
import { TontineDataService } from './tontine-data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TontineResolver implements Resolve<Tontine> {
  constructor(private dataService: TontineDataService) { }
  resolve(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot): Tontine | import('rxjs').Observable<Tontine> | Promise<Tontine> {
    const tontineId = route.paramMap.get('tontineId');
    return this.dataService.getTontineById(tontineId);
  }
}
