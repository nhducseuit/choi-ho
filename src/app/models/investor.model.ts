export enum InvestorStatus {
  New = 'NEW',
  Active = 'ACTIVE',
  Invested = 'INVESTED',
  Changed = 'CHANGED',
  Removed = 'REMOVED'
}

export interface Investor {
  createdDate: number;
  updatedDate: number;
  deletedDate?: number;
  id: string;
  tontineId: string;
  name: string;
  joinDate: string;
  debt: number;
  status: InvestorStatus;
  bankAccount: string;
  bank: string;
  phoneNumber: string;
  fb: string;
  turns: number;
  nextTurns: number[];
  yearOfBirth?: number;
  gender?: string;
  address?: string;
}
