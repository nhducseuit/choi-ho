import { Investor, InvestorStatus } from './../models/investor.model';
import { Injectable } from '@angular/core';
import { Tontine } from '../models/tontine.model';
import { Observable, of } from 'rxjs';
import * as  uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TontineService {

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
    const configurationMismatched = investors.some(investor => investor.turns !== investor.nextTurn.length);
    if (configurationMismatched) {
      return 'Some investor information is not correct';
    }
    return true;
  }

  public addNewInvestor(tontine: Tontine, investor: any): Tontine | Observable<Tontine> {
    if (!investor) {
      return null;
    }
    const newInvestor: Investor = {
      createdDate: new Date().getTime(),
      updatedDate: new Date().getTime(),
      id: uuid.v4(),
      name: investor.name,
      joinDate: investor.joinDate,
      status: InvestorStatus.New,
      debt: 0,
      bank: investor.bank,
      bankAccount: investor.bankAccount,
      phoneNumber: investor.phoneNumber,
      fb: investor.fb,
      turns: 1,
      nextTurn: [this.appendTurnToTontine(tontine)],
      yearOfBirth: investor.yearOfBirth,
      gender: investor.gender,
      address: investor.address
    };
    return this.addNewInvestorToTontine(tontine, newInvestor);
  }

  private addNewInvestorToTontine(tontine: Tontine, investor: Investor): Tontine | Observable<Tontine> {
    tontine.investors.push(investor);
    // tontine.round++; Haven't yet updated the round
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
      .find(investor => investor.nextTurn.some(nt => nt === tontine.turn));
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

  private appendTurnToTontine(tontine: Tontine): number {
    return tontine.round + 1;
  }

  public getPassedTurnInARound(tontine: Tontine, investor: Investor): number[] {
    const passedTurn = [];
    for (const turn of investor.nextTurn) {
      if (turn <= tontine.turn) {
        passedTurn.push(turn);
      }
    }
    return passedTurn;
  }

  public getRemainingTurnInARound(tontine: Tontine, investor: Investor): number[] {
    const remainingTurn = [];
    for (const turn of investor.nextTurn) {
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
    investor.debt += (investor.turns * tontine.sum);
    investor.status = InvestorStatus.Invested;

  }
}
