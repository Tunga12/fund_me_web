export interface Notification {
  _id?: string;
  recipients?: string[];
  viewed?: string[];
  fundraiser: string;
  notificationType: string;
  content: string;
  title: string;
  date: string;
  target: string;
}
