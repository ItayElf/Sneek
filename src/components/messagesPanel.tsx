import useFetchMessages from "../hooks/useFetchMessages";

interface Props {
  token: string;
  username: string;
}

function MessagesPanel({ token, username }: Props) {
  const messages = useFetchMessages(token, 500);

  return (
    <>
      <div className="h-[80vh] overflow-y-scroll w-full no-scrollbar flex flex-col-reverse"></div>
    </>
  );
}

export default MessagesPanel;
