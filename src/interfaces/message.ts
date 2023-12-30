export default interface Message {
  id: number;
  content: string;
  sent_at: string;
  expired_at: string;
  sent_by: string;
  message_type: string;
}
