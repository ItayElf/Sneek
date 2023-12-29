import Channel from "../interfaces/channel";

interface Props {
  channel: Channel;
}

function ChannelCard({ channel }: Props) {
  return (
    <div className="bg-primary p-4 text-center rounded-lg w-full space-y-2 cursor-pointer hover:scale-105 transition-transform duration-300 ease-out">
      <h4 className="2xl:h4 text-white lg:h5 md:h5 sm:h4 h5">{channel.name}</h4>
      <p className="h6 text-text-light">
        🕴 {channel.connected_participants}
        {channel.max_participants && ` / ${channel.max_participants}`} | ⌛{" "}
        {channel.message_duration}s
      </p>
    </div>
  );
}

export default ChannelCard;
