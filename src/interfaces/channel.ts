export default interface Channel {
  name: String;
  max_participants: number | null;
  connected_participants: number;
  message_duration: number;
}
