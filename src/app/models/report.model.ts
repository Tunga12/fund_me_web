export interface Report {
  fundraiserId: string;
  reason: {
    name: string;
    _id?: string;
  };
  _id?: string;
  userId?: string;
  date: string;
  __v?: string;
}
