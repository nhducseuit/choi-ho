import { TontineHttpService } from './../services/tontine-http.service';
import { TontineService } from './../services/tontine.service';
import { TontineLocalStorageService } from './../services/tontine-localstorage.service';
import { ShareDataService } from './../services/share-data.service';
import { Tontine } from './../models/tontine.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-administrative',
  templateUrl: './administrative.component.html',
  styleUrls: ['./administrative.component.scss']
})
export class AdministrativeComponent implements OnInit {

  tontine: Tontine;
  constructor(
    private tontineDataService: TontineHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private shareDataService: ShareDataService,
    private tontineService: TontineService
  ) { }

  async ngOnInit() {
    this.tontine = await this.tontineDataService.getTontineById('phuong-vlog').toPromise();
    console.log('Just update cached tontine');

    this.tontine.investors = await this.tontineDataService.getInvestorsOfTontine(this.tontine.id).toPromise();
    console.log('Just update investor list of tontine');
    // .subscribe(res => {
    //   this.tontine = res;
    // });
  }

  addNewInvestor() {
    this.shareDataService.setData(this.tontine.id, this.tontine);
    this.router.navigate(['add-investor', this.tontine.id], { relativeTo: this.route });
  }

  turnTontine() {
    this.tontineService.shiftTurn(this.tontine);
  }

}
