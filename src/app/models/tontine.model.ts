import { Investor } from './investor.model';
export type PeriodUnit = 'Month' | 'Year';
export interface Period {
  unit: PeriodUnit;
  amount: number;
}
export interface Tontine {
    createdDate: number;
    updatedDate: number;
    id: string;
    round: number;
    turn: number;
    period: Period;
    startDate: string;
    sum: number;
    investors: Investor[];
    investee: Investor;
}
