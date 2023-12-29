import ChannelCard from "../components/channelCard";
import LoadingCirle from "../components/loadingCircle";
import useFetchChannels from "../hooks/useFetchChannels";
import useFetchUser from "../hooks/useFetchUser";
import { jwtDecode } from "jwt-decode";
import { ReactComponent as Logo } from "../logo.svg";

/// Returns the duration from now until [timestamp] as {hours}:{minutes}
const getFormattedDuration = (timestamp: number) => {
  const now = Date.now();
  const difference = timestamp - now;
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
};

function Home() {
  const userData = useFetchUser();
  const channels = useFetchChannels();

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
  const formattedTime = getFormattedDuration(expiredTimestamp);

  return (
    <>
      <div className="w-full mx-auto container bg-background-light sm:mt-16 flex items-center p-8 flex-col rounded">
        <Logo />
        <h1 className="h1 font-glitch -mt-4 text-primary">SNEEK</h1>
        <p className="lg:h4 -mt-4 mb-8 sm:h5 h6 text-center">
          You are connected as{" "}
          <span className="text-primary italic">{capitalizedName}</span>. <br />
          Your session is valid for{" "}
          <span className="text-primary italic">{formattedTime}</span> hours.
          Happy hacking!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {channels.map((channel) => (
            <ChannelCard channel={channel} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
