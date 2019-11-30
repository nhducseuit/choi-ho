export enum InvestorStatus {
  New = 'NEW',
  Active = 'ACTIVE',
  Changed = 'CHANGED',
  Removed = 'REMOVED'
}

export interface Investor {
  createdDate: number;
  updatedDate: number;
  deletedDate?: number;
  id: string;
  name: string;
  joinDate: string;
  debt: number;
  status: InvestorStatus;
  bankAccount: string;
  bank: string;
  phoneNumber: string;
  fb: string;
  turns: number;
  nextTurn: number[];
  yearOfBirth?: number;
  gender?: string;
  address?: string;
}
