import { TontineService } from './../../services/tontine.service';
import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { Investor } from 'src/app/models/investor.model';
import { Tontine } from 'src/app/models/tontine.model';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InvestorComponent implements OnInit, OnChanges {

  @Input() investor: Investor;
  @Input() tontine: Tontine;

  joinDate: string;
  passedTurns: string[];
  remainingTurns: string[];
  endOfRound: string;
  endOfRoundDebt: number;

  constructor(private tontineService: TontineService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (this.investor && this.tontine) {
      this.joinDate = this.getJoinDate();
      this.passedTurns = this.getPassedTurns();
      this.remainingTurns = this.getRemainingTurns();
      this.endOfRound = this.getEndOfRound();
      this.endOfRoundDebt = this.calculateDebtByEndOfRound();
    }
  }

  getJoinDate(): string {
    const [_, joinMonth, joinYear] = this.investor.joinDate.split('-');
    return `Tháng ${joinMonth}, ${joinYear}`;
  }

  getPassedTurns(): string[] {
    return this.tontineService.getPassedTurnInARound(this.tontine, this.investor)
      .map(turn => this.tontineService.convertTurnToString(turn, this.tontine));
  }

  getRemainingTurns(): string[] {
    return this.tontineService.getRemainingTurnInARound(this.tontine, this.investor)
      .map(turn => this.tontineService.convertTurnToString(turn, this.tontine));
  }

  getEndOfRound(): string {
    return this.tontineService.convertTurnToString(this.tontine.round, this.tontine);
  }

  calculateDebtByEndOfRound(): number {
    const currentDebt = this.investor.debt;
    const currentTurn = this.tontine.turn;
    const round = this.tontine.round;
    const sum = this.tontine.sum;
    const remainingInvestedTurns = this.tontineService.getRemainingTurnInARound(this.tontine, this.investor).length;
    return currentDebt - (this.investor.turns * sum * (round - currentTurn - remainingInvestedTurns))
                       + remainingInvestedTurns * sum * (round - this.investor.turns);
  }

}
