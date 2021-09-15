export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  emailNotification?: boolean;
  isDeactivated?: boolean;
  isAdmin?: boolean;
  isVerified?:boolean;
  __v?:string;
  date?: string;
  phoneNumber?:string;
}
