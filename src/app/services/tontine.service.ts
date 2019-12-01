import { TontineLocalStorageService } from './tontine-localstorage.service';
import { Investor, InvestorStatus } from './../models/investor.model';
import { Injectable } from '@angular/core';
import { Tontine } from '../models/tontine.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TontineService {


  constructor(private tontineDataService: TontineLocalStorageService) {}

  public validateTontine(tontine: Tontine, investors: Investor[]): boolean | string {
    if (!tontine) {
      return 'Tontine is not defined';
    }
    if (tontine.sum <= 0) {
      return 'Sum must be greater than 0';
    }
    if (tontine.round <= 0) {
      return 'Tontine must have a positive round number defined';
    }
    if (!tontine.investors || tontine.investors.length <= 0) {
      return 'Tontine must have at least 1 investor';
    }
    if (!investors || investors.length <= 0) {
      return 'Tontine must have at least 1 investor';
    }
    const totalTurns = investors.map(investor => investor.turns).reduce((turn1, turn2) => turn1 + turn2);
    if (totalTurns !== tontine.round) {
      return 'Tontine information is out of sync';
    }
    const configurationMismatched = investors.some(investor => investor.turns !== investor.nextTurns.length);
    if (configurationMismatched) {
      return 'Some investor information is not correct';
    }
    return true;
  }

  public addNewInvestor(tontine: Tontine, investor: Investor, investToCurrentRound?: boolean): Tontine | Observable<Tontine> {
    tontine.investors.push(investor);
    const isInvestee = !tontine.investee && investor.nextTurns.some(nextTurn => nextTurn === tontine.turn);
    if (isInvestee) {
      investor.status = InvestorStatus.Active;
      tontine.round++;
      tontine.investee = investor;
    } else if (investToCurrentRound) {
      this.invest(tontine, investor);
      tontine.round++;
    } // Last case that round size of tontine isn't updated: investor is added as new but is scheduled to join next round shift

    // TODO save investor data to server as well
    this.tontineDataService.saveTontine(tontine);
    return tontine;
  }

  public shiftTurn(tontine: Tontine): Tontine {
    // TODO shift to a new turn
    // NB! Turn can only be shifted forward
    // 1. Check if there is any investor which is marked as 'NEW' or 'CHANGED' and recalculate tontine's round. Make no change otherwise
    const shouldUpdateRound = tontine.investors
      .some(investor => investor.status === InvestorStatus.New || investor.status === InvestorStatus.Changed);
    if (shouldUpdateRound) {
      tontine.round = tontine.investors
        .map(investor => investor.turns)
        .reduce((turn, anotherTurn) => turn + anotherTurn);
    }
    // After round is updated, current turn of tontine should be calculated
    // However in case current turn is already at the end of round, exit with error,
    // it should shift round instead of shift turn
    if (this.isTontineEnding(tontine)) {
      throw new Error('Tontine is ending. Shift round instead!');
    }
    // Shift turn
    tontine.turn++;
    //  Determine investee
    const nextInvestee = tontine.investors
      .find(investor => investor.nextTurns.some(nt => nt === tontine.turn));
    if (!nextInvestee) {
      throw new Error('Cannot determine next Investee!');
    }
    // Shift all investors to new turn. For new investee, update debt correctly and set to tontine
    // After that, set updated investors to tontine
    tontine.investors = tontine.investors.map(investor => {
      const updatedInvestor = this.shiftInvestorToNewTurn(investor, tontine);
      if (updatedInvestor.id === nextInvestee.id) {
        updatedInvestor.debt += (tontine.round * tontine.sum);
        tontine.investee = updatedInvestor;
      }
      return updatedInvestor;
    });

    return tontine;
  }

  public isTontineEnding(tontine: Tontine): boolean {
    return tontine.turn === tontine.round;
  }

  public shiftInvestorToNewTurn(investor: Investor, tontine: Tontine): Investor {
    investor.debt -= (investor.turns * tontine.sum);
    investor.status = InvestorStatus.Active;
    return investor;
  }

  public shiftRound(tontine: Tontine): Tontine {
    // TODO shift round to new round
    return tontine;
  }

  public getPassedTurnInARound(tontine: Tontine, investor: Investor): number[] {
    const passedTurn = [];
    for (const turn of investor.nextTurns) {
      if (turn <= tontine.turn) {
        passedTurn.push(turn);
      }
    }
    return passedTurn;
  }

  public getRemainingTurnInARound(tontine: Tontine, investor: Investor): number[] {
    const remainingTurn = [];
    for (const turn of investor.nextTurns) {
      if (turn > tontine.turn) {
        remainingTurn.push(turn);
      }
    }
    return remainingTurn;
  }

  public convertTurnToString(turn: number, tontine: Tontine): string {
    const [_, startMonthStr, startYearStr] = tontine.startDate.split('-');
    const startMonth = parseInt(startMonthStr, 10);
    const startYear = parseInt(startYearStr, 10);
    const month = (startMonth + turn - 1) % 12 + 1;
    const year = Math.trunc(startYear + ((startMonth + turn - 1) / 12));
    switch (tontine.period.unit) {
      case 'Month':
        return `Tháng ${month}, ${year}`;
      case 'Year':
        return `${year}`;
      default:
        return 'Họ chỉ tính lượt bằng tháng hoặc năm';
    }
  }

  public invest(tontine: Tontine, investor: Investor) {
    const investAmount = (investor.turns * tontine.sum);
    investor.debt -= investAmount;
    investor.status = InvestorStatus.Invested;
    tontine.investee.debt += investAmount;
    // return investor;
  }
}
