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


export interface Report2 {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  url: string;
  knowsOrganizer: boolean;
  knowsDescription: string;
  reportType: string;
  reportDescription: string;
  userId?: string; // must be entered by system
  status: string;
  date: string;
  __v?: string;
}







