export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  paymentMethods?: string;
  emailNotification?: boolean;
  isDeactivated?: boolean;
  isAdmin?: boolean;
}
