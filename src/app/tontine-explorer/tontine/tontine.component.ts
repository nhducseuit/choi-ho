import { TONTINE, INVESTORS } from './../../models/mock';
import { Component, OnInit } from '@angular/core';
import { Tontine } from 'src/app/models/tontine.model';
import { Investor } from 'src/app/models/investor.model';

@Component({
  selector: 'app-tontine',
  templateUrl: './tontine.component.html',
  styleUrls: ['./tontine.component.scss']
})
export class TontineComponent implements OnInit {

  tontine: Tontine;
  investors: Investor[];
  selectedInvestor: Investor;

  constructor() { }

  ngOnInit() {
    this.initMockData();
  }

  initMockData() {
    // Assume an initial tontine between 2 people
    this.tontine = Object.assign({}, TONTINE);
    this.investors = [...INVESTORS].slice(0, 7);
    this.tontine.investors = this.investors;
    this.tontine.investee = this.investors[0];
    this.tontine.round = 7;
  }

  investorClicked(investor: Investor) {
    this.selectedInvestor = investor;
  }
}
