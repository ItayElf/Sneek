import { useCallback, useState } from "react";
import Channel from "../interfaces/channel";

interface Props {
  channel: Channel;
  onClick: (channelName: string) => Promise<void>;
}

function ChannelCard({ channel, onClick }: Props) {
  const [isActive, setIsActive] = useState(
    channel.max_participants === null ||
      channel.connected_participants < channel.max_participants
  );
  const clicked = useCallback(() => {
    if (!isActive) {
      return;
    }
    setIsActive(false);
    onClick(channel.name).finally(() =>
      setIsActive(
        channel.max_participants === null ||
          channel.connected_participants < channel.max_participants
      )
    );
  }, [
    channel.name,
    channel.max_participants,
    channel.connected_participants,
    isActive,
    onClick,
  ]);

  return (
    <div
      className={`bg-primary p-4 text-center rounded-lg w-full space-y-2 cursor-pointer hover:scale-105 transition-transform duration-300 ease-out ${
        !isActive && "cursor-auto bg-background text-white/50 hover:scale-100"
      }`}
      onClick={clicked}
    >
      <h4 className="2xl:h4 lg:h5 md:h5 sm:h4 h5">{channel.name}</h4>
      <p className={`h6 text-text-light ${!isActive && "text-white/50"}`}>
        🕴 {channel.connected_participants}
        {channel.max_participants && ` / ${channel.max_participants}`} | ⌛{" "}
        {channel.message_duration}s
      </p>
    </div>
  );
}

export default ChannelCard;
