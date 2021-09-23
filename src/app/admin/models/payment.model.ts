export interface Payment {
  firstName: string;
  lastName: string;
  bankName: string;
  bankAccountNo: string;
  fundraiserId:string;
  amount: number;
  status?:number;
  reason?:string;
}
