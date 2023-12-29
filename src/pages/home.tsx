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

  console.log({ userData, channels });

  return (
    <>
      <div className="w-full mx-auto container bg-background-light sm:mt-16 flex items-center p-8 flex-col rounded">
        <Logo />
        <h1 className="h1 font-glitch -mt-4">SNEEK</h1>
      </div>
    </>
  );
}

export default Home;
