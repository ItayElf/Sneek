export default interface Message {
  id: number;
  content: string;
  sent_at: number;
  expired_at: number;
  sent_by: string;
  message_type: string;
}
