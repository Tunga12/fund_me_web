import { User } from "./user.model";

export interface Withdrawal {
    status?: string,
    isDeleted?: boolean,
    _id?: string,
    bankName: string,
    bankAccountNo: string,
    isOrganizer?: boolean,
    beneficiary?: User,
    date?: string,
}