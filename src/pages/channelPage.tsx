import { Navigate, useNavigate, useParams } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";
import { useFetchChannel } from "../hooks/useFetchChannels";
import LoadingCirle from "../components/loadingCircle";
import { useCallback } from "react";
import { API_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";

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

  const capitalizedName = userData.name.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );

  return (
    <>
      <div className="w-full mx-auto container bg-background-light sm:mt-12 flex items-center flex-col rounded overflow-hidden h-[100vh] justify-between sm:h-auto">
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
              {channel.max_participants && ` / ${channel.max_participants}`} |
              ⌛ {channel.message_duration}s
            </div>
          </div>
        </div>
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
