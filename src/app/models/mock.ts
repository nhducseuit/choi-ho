import { Tontine } from './tontine.model';
import { Investor, InvestorStatus } from './investor.model';

/**
 * Turn must be 0 based
 */
export const TONTINE: Tontine = {
  createdDate: new Date().valueOf(),
  updatedDate: new Date().valueOf(),
  id: 'phuong-vlog',
  round: 0,
  turn: 0,
  period: {
    unit: 'Month',
    amount: 1
  },
  startDate: '01-05-2019',
  sum: 2000,
  investors: [],
  investee: null
};

export const INVESTORS: Investor[] = [
  {
    createdDate: 1573832731696,
    updatedDate: 1573832731696,
    id: '1',
    name: 'Nguyễn Hoàng Đức',
    joinDate: '01-05-2019',
    debt: 0,
    status: InvestorStatus.New,
    bankAccount: '60150582329',
    bank: 'Sacombank cn Lang Cha Ca TPHCM',
    phoneNumber: '0937249085',
    fb: 'https://www.facebook.com/duc.nguyen.hoang.uit',
    turns: 1,
    nextTurns: [1]
  },
  {
    createdDate: 1573832731696,
    updatedDate: 1573832731696,
    id: '2',
    name: 'Phan Thị Thúy Hằng',
    joinDate: '01-05-2019',
    debt: 0,
    status: InvestorStatus.New,
    bankAccount: '100867593006',
    bank: 'Vietinbank cn Nghe An',
    phoneNumber: '',
    fb: 'https://www.facebook.com/tronveoo',
    turns: 1,
    nextTurns: [2]
  },
  {
    createdDate: 1573832731696,
    updatedDate: 1573832731696,
    id: '3',
    name: 'Nguyễn Thị Khánh Linh',
    joinDate: '01-05-2019',
    debt: 0,
    status: InvestorStatus.New,
    bankAccount: '19034726715011',
    bank: 'Techcombank cn Ha Tay - HN',
    phoneNumber: '',
    fb: 'https://www.facebook.com/khanhlinh8493',
    turns: 1,
    nextTurns: [3]
  },
  {
    createdDate: 1573832731696,
    updatedDate: 1573832731696,
    id: '4',
    name: 'Nguyễn Thị Thu Hà',
    joinDate: '01-09-2019',
    debt: 0,
    status: InvestorStatus.New,
    bankAccount: '1541000168099',
    bank: 'NH TMCP An Binh - ABBANK',
    phoneNumber: '',
    fb: 'https://www.facebook.com/ha.ntt.92',
    turns: 2,
    nextTurns: [4, 9]
  },
  {
    createdDate: 1573832731696,
    updatedDate: 1573832731696,
    id: '5',
    name: 'Nguyễn Thị Hiền',
    joinDate: '01-05-2019',
    debt: 0,
    status: InvestorStatus.New,
    bankAccount: '19034629729014',
    bank: 'Techcombank CN Vinh - Nghe An',
    phoneNumber: '',
    fb: 'https://www.facebook.com/profile.php?id=100027737738651',
    turns: 1,
    nextTurns: [5]
  },
  {
    createdDate: 1573832731696,
    updatedDate: 1573832731696,
    id: '6',
    name: 'Nguyễn Thị Linh',
    joinDate: '01-05-2019',
    debt: 0,
    status: InvestorStatus.New,
    bankAccount: '008704060073609',
    bank: 'NH TMCP Quốc Tế VIB',
    phoneNumber: '',
    fb: 'https://www.facebook.com/linhnguyen.books',
    turns: 1,
    nextTurns: [6]
  },
  {
    createdDate: 1573832731696,
    updatedDate: 1573832731696,
    id: '7',
    name: 'Nguyễn Dương Minh Thảo',
    joinDate: '01-09-2019',
    debt: 0,
    status: InvestorStatus.New,
    bankAccount: '1541077066006',
    bank: 'NH TMCP An Binh - ABBANK',
    phoneNumber: '0937249085',
    fb: 'https://www.facebook.com/profile.php?id=100008844492988',
    turns: 1,
    nextTurns: [7]
  },
  {
    createdDate: 1573832731696,
    updatedDate: 1573832731696,
    id: '8',
    name: 'Nguyễn Thị Khánh',
    joinDate: '01-11-2019',
    debt: 0,
    status: InvestorStatus.New,
    bankAccount: '3600205382696',
    bank: 'Agribank CN Vinh - Nghệ An',
    phoneNumber: '',
    fb: 'https://www.facebook.com/chanh.bim',
    turns: 1,
    nextTurns: [8]
  },
  {
    createdDate: 1573832731696,
    updatedDate: 1573832731696,
    id: '9',
    name: 'Nguyễn Thị Lê',
    joinDate: '01-11-2019',
    debt: 0,
    status: InvestorStatus.New,
    bankAccount: '2006206170349',
    bank: 'Agribank CN Ngũ Hành Sơn - Đà Nẵng',
    phoneNumber: '',
    fb: 'https://www.facebook.com/biennho.nho.92',
    turns: 1,
    nextTurns: [10]
  }
];

