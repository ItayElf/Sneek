import { Navigate, useNavigate, useParams } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";
import { useFetchChannel } from "../hooks/useFetchChannels";
import LoadingCirle from "../components/loadingCircle";
import { useCallback } from "react";
import { API_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import ChannelHeader from "../components/channelHeader";

function ChannelPage() {
  const { channelName } = useParams();
  const navigate = useNavigate();
  const userData = useFetchUser();
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

  return (
    <>
      <div className="w-full mx-auto container bg-background-light sm:mt-12 flex items-center flex-col rounded overflow-hidden h-[100vh] justify-between sm:h-auto">
        <ChannelHeader
          channel={channel}
          username={userData.name}
          onBack={onBack}
        />
        <div className="min-h-[80vh]"></div>
        <div className="p-4 bg-primary w-full"></div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default ChannelPage;
