import ChannelCard from "../components/channelCard";
import LoadingCirle from "../components/loadingCircle";
import useFetchChannels from "../hooks/useFetchChannels";
import useFetchUser from "../hooks/useFetchUser";
import { jwtDecode } from "jwt-decode";
import { ReactComponent as Logo } from "../logo.svg";
import { useCallback } from "react";
import { API_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Timer from "../components/timer";

function Home() {
  const userData = useFetchUser();
  const channels = useFetchChannels(1000);

  const onJoin = useCallback(
    async (channel: string) => {
      if (!userData) {
        return;
      }
      const response = await fetch(API_URL + "channels/join", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ channel }),
      });
      if (!response.ok) {
        toast.error(await response.text());
      }
    },
    [userData]
  );

  if (userData == null || channels == null) {
    return (
      <div className="h-[100vh] grid bg-center">
        <LoadingCirle />
      </div>
    );
  }

  const capitalizedName = userData.name.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );

  const expiredTimestamp = (jwtDecode(userData.token).exp ?? 0) * 1000;

  return (
    <>
      <div className="w-full mx-auto container bg-background-light sm:mt-16 flex items-center p-8 flex-col rounded">
        <Logo />
        <h1 className="h1 font-glitch -mt-4 text-primary">SNEEK</h1>
        <p className="lg:h4 -mt-4 mb-8 sm:h5 h6 text-center">
          You are connected as{" "}
          <span className="text-primary italic">{capitalizedName}</span>. <br />
          Your session is valid for{" "}
          <Timer timestamp={expiredTimestamp} className="text-primary italic" />
          . Happy hacking!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {channels.map((channel, i) => (
            <ChannelCard channel={channel} onClick={onJoin} key={i} />
          ))}
        </div>
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

export default Home;
