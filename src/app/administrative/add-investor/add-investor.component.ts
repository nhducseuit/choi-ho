import { TontineLocalStorageService } from './../../services/tontine-localstorage.service';
import { TontineService } from './../../services/tontine.service';
import { ShareDataService } from './../../services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Tontine } from 'src/app/models/tontine.model';
import { ActivatedRoute, Router } from '@angular/router';

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
    private tontineService: TontineService,
    private tontineDataService: TontineLocalStorageService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const tontineId = paramMap.get('tontineId');
      if (tontineId) {
        this.tontine = this.shareDataService.getData(tontineId);
      }
      if (!tontineId || !this.tontine) {
        this.router.navigate(['admin']);
      } else {
        const round = this.tontine.round;
        this.investor = this.fb.group({
          name: ['', Validators.required],
          joinDate: [new Date(), Validators.required],
          turns: this.fb.array([
            [round]
          ], Validators.required),
          bank: ['', Validators.required],
          bankAccount: ['', Validators.required],
          investToCurrentRound: [true]
        });
      }
    });
  }

  get turns(): FormArray {
    return this.investor.get('turns') as FormArray;
  }

  addNewTurn() {
    this.tontine.round++;
    this.turns.insert(this.turns.length - 1, this.fb.control(this.tontine.round));
  }

  removeTurn(index: number) {
    (this.investor.get('turns') as FormArray).removeAt(index);
  }

  formatLabel = (value: number) => {
    return this.tontineService.convertTurnToString(value, this.tontine);
  }

  addNewInvestor() {
    const updatedTontine = this.tontineService.addNewInvestor(this.tontine, this.investor) as Tontine;
    this.tontineDataService.saveTontine(updatedTontine);
    this.router.navigate(['admin']);
  }

  get investData(): any {
    return {
      name: this.investor.get('name').value,
      joinDate: this.joinDate,
      nextTurn: this.turns.value as Array<number>,
      turns: (this.turns.value as Array<number>).length,
      bank: this.investor.get('bank').value,
      bankAccount: this.investor.get('bankAccount').value
    };
  }

  get joinDate(): string {
    const joinDateValue = this.investor.get('joinDate').value as Date;
    const day = joinDateValue.getDate();
    const month = joinDateValue.getMonth();
    const year = joinDateValue.getFullYear();
    const dayStr = day > 9 ? `${day}` : `0${day}`;
    const monthStr = month > 9 ? `${month}` : `0${month}`;
    return `${dayStr}-${monthStr}-${year}`;
  }
}
