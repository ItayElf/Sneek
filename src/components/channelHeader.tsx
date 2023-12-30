import Channel from "../interfaces/channel";

interface Props {
  channel: Channel;
  username: string;
  onBack: () => void;
}

function ChannelHeader({ channel, username, onBack }: Props) {
  const capitalizedName = username.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );

  return (
    <div className="p-4 bg-primary w-full shadow-lg flex justify-between items-center">
      <div className="flex">
        <button className="pr-4" onClick={onBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="h-8 w-8 fill-text"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>
        <h4 className="h5 lg:h4">{channel.name}</h4>
      </div>
      <div>
        <div className="h6 lg:h5 text-text">
          <span className="hidden md:inline">{capitalizedName} | </span>
          🕴 {channel.connected_participants}
          {channel.max_participants && ` / ${channel.max_participants}`} | ⌛{" "}
          {channel.message_duration}s
        </div>
      </div>
    </div>
  );
}

export default ChannelHeader;
