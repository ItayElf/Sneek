import { useParams } from "react-router-dom";

function ChannelPage() {
  const { channelName } = useParams();

  return <>{channelName}</>;
}

export default ChannelPage;
