import { TontineFirebaseDataService } from './../services/tontine-firebase-data.service';
import { Component, OnInit } from '@angular/core';
import { Tontine } from 'src/app/models/tontine.model';
import { Investor } from 'src/app/models/investor.model';

const tontineId = 'phuong-vlog';
@Component({
  selector: 'app-tontine',
  templateUrl: './tontine.component.html',
  styleUrls: ['./tontine.component.scss']
})
export class TontineComponent implements OnInit {

  tontine: Tontine;
  investors: Investor[];
  selectedInvestor: Investor;

  constructor(private tontineFirebaseService: TontineFirebaseDataService) { }

  async ngOnInit() {
    this.tontineFirebaseService.tontine.subscribe(tontine => this.tontine = tontine);
    this.tontineFirebaseService.investors.subscribe(investors => this.investors = investors);
  }

  investorClicked(investor: Investor) {
    this.selectedInvestor = investor;
  }
}
