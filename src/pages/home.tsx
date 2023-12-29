import ChannelCard from "../components/channelCard";
import LoadingCirle from "../components/loadingCircle";
import useFetchChannels from "../hooks/useFetchChannels";
import useFetchUser from "../hooks/useFetchUser";
import { ReactComponent as Logo } from "../logo.svg";

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

  return (
    <>
      <div className="w-full mx-auto container bg-background-light sm:mt-16 flex items-center p-8 flex-col rounded">
        <Logo />
        <h1 className="h1 font-glitch -mt-4 text-primary">SNEEK</h1>
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
