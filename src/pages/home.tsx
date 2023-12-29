import LoadingCirle from "../components/loadingCircle";
import useFetchUser from "../hooks/useFetchUser";

function Home() {
  const userData = useFetchUser();

  if (userData == null) {
    return (
      <div className="h-[100vh] grid bg-center">
        <LoadingCirle />
      </div>
    );
  }

  return <></>;
}

export default Home;
