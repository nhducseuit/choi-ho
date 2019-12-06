import { TontineService } from './../../services/tontine.service';
import { ShareDataService } from './../../services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tontine } from 'src/app/models/tontine.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Investor, InvestorStatus } from 'src/app/models/investor.model';
import * as  uuid from 'uuid';

@Component({
  selector: 'app-add-investor',
  templateUrl: './add-investor.component.html',
  styleUrls: ['./add-investor.component.scss']
})
export class AddInvestorComponent implements OnInit {
  tontine: Tontine;
  investor: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private shareDataService: ShareDataService,
    private tontineService: TontineService
  ) { }

  /**
   * Turn must be 0 based
   */
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const tontineId = paramMap.get('tontineId');
      if (tontineId) {
        this.tontine = this.shareDataService.getData(tontineId);
      }
      if (!tontineId || !this.tontine) {
        this.router.navigate(['admin']);
      } else {
        this.investor = this.fb.group({
          name: ['', Validators.required],
          joinDate: [new Date(), Validators.required],
          turns: [1, Validators.required],
          bank: ['', Validators.required],
          bankAccount: ['', Validators.required],
          investToCurrentRound: [true],
          gender: [''],
          address: [''],
          phoneNumber: [''],
          fb: [''],
          yearOfBirth: ['']
        });
      }
    });
  }

  addNewInvestor() {
    this.tontineService.addNewInvestor(this.tontine, this.newInvestor, this.investor.get('investToCurrentRound').value);
    this.router.navigate(['admin']);
  }

  get nextTurns(): number[] {
    const nextTurns = [];
    const turns = this.investor.get('turns').value as number;
    const recalculatedRound = this.tontine.round + turns;
    for (let i = turns; i > 0; i--) {
      nextTurns.push(recalculatedRound - i);
    }
    return nextTurns;
  }

  get newInvestor(): Investor {
    const investUserInput = {
      name: this.investor.get('name').value,
      joinDate: this.joinDate,
      nextTurns: this.nextTurns,
      turns: this.investor.get('turns').value,
      bank: this.investor.get('bank').value,
      bankAccount: this.investor.get('bankAccount').value,
      phoneNumber: this.investor.get('phoneNumber').value,
      fb: this.investor.get('fb').value,
      yearOfBirth: this.investor.get('yearOfBirth').value,
      gender: this.investor.get('gender').value,
      address: this.investor.get('address').value
    };

    return {
      createdDate: new Date().getTime(),
      updatedDate: new Date().getTime(),
      id: uuid.v4(),
      tontineId: this.tontine.id,
      name: investUserInput.name,
      joinDate: investUserInput.joinDate,
      status: InvestorStatus.New,
      debt: 0,
      bank: investUserInput.bank,
      bankAccount: investUserInput.bankAccount,
      phoneNumber: investUserInput.phoneNumber,
      fb: investUserInput.fb,
      turns: investUserInput.turns,
      nextTurns: investUserInput.nextTurns,
      yearOfBirth: investUserInput.yearOfBirth,
      gender: investUserInput.gender,
      address: investUserInput.address
    };
  }

  get joinDate(): string {
    const joinDateValue = this.investor.get('joinDate').value as Date;
    const day = joinDateValue.getDate();
    const month = joinDateValue.getMonth() + 1; // Month is 0 based
    const year = joinDateValue.getFullYear();
    const dayStr = day > 9 ? `${day}` : `0${day}`;
    const monthStr = month > 9 ? `${month}` : `0${month}`;
    return `${dayStr}-${monthStr}-${year}`;
  }
}
