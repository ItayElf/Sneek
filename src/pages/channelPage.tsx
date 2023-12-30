import { Navigate, useNavigate, useParams } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";
import { useFetchChannel } from "../hooks/useFetchChannels";
import LoadingCirle from "../components/loadingCircle";
import { useCallback } from "react";
import { API_URL } from "../config";
import ChannelHeader from "../components/channelHeader";
import Toaster from "../components/toaster";
import { toast } from "react-toastify";
import useFetchMessages from "../hooks/useFetchMessages";
import ChannelFooter from "../components/channelFooter";

function ChannelPage() {
  const { channelName } = useParams();
  const navigate = useNavigate();
  const userData = useFetchUser();
  const messages = useFetchMessages(userData?.token ?? "", 500);
  const { object: channel, error: channelError } = useFetchChannel(
    channelName ?? "",
    1000
  );

  const onBack = useCallback(async () => {
    if (!userData) {
      return;
    }
    const response = await fetch(API_URL + "channels/leave", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userData.token}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      toast.error(await response.text());
      return;
    }
    navigate("/");
  }, [userData, navigate]);

  if (channelError) {
    return <>{channelError}</>;
  }

  if (!userData || !channel || !messages) {
    return (
      <div className="h-[100vh] grid bg-center">
        <LoadingCirle />
      </div>
    );
  }

  if (userData.connected_to !== channel.name) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="h-[100vh] flex justify-center">
        <div className="mx-auto container bg-background-light sm:my-auto flex items-center flex-col rounded overflow-hidden h-100 justify-between sm:h-auto">
          <ChannelHeader
            channel={channel}
            username={userData.name}
            onBack={onBack}
          />
          <div className="min-h-[80vh]"></div>
          <ChannelFooter token={userData.token} />
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default ChannelPage;
