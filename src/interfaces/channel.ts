export default interface Channel {
  name: string;
  max_participants: number | null;
  connected_participants: number;
  message_duration: number;
}
