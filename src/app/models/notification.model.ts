export interface Notification {
  id?: string;
  userIds?: string[];
  fundraiser: string;
  type: string;
  content: string;
}
