export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  paymentMethods?: string;
  emailNotification?: boolean;
  isDeactivated?: boolean;
  isAdmin?: boolean;
  __v?:string;
  date?: string;
}
