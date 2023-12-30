import { Navigate, useParams } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";
import { useFetchChannel } from "../hooks/useFetchChannels";
import LoadingCirle from "../components/loadingCircle";

function ChannelPage() {
  const { channelName } = useParams();
  const userData = useFetchUser();
  const { object: channel, error: channelError } = useFetchChannel(
    channelName ?? ""
  );

  if (channelError) {
    return <>{channelError}</>;
  }

  if (!userData || !channel) {
    return (
      <div className="h-[100vh] grid bg-center">
        <LoadingCirle />
      </div>
    );
  }

  if (userData.connected_to !== channel.name) {
    return <Navigate to="/" />;
  }

  return <>{channelName}</>;
}

export default ChannelPage;
