export interface Notification {
  _id?: string;
  userIds?: string[];
  fundraiser: string;
  notificationType: string;
  content: string;
  title: string;
  date: string;
  target: string;
}
