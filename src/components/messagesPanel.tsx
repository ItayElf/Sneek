import useFetchMessages from "../hooks/useFetchMessages";
import MessageView from "./messageView";

interface Props {
  token: string;
  username: string;
}

function MessagesPanel({ token, username }: Props) {
  const { object: messages } = useFetchMessages(token, 500);

  const validMessages = messages ?? [];

  return (
    <>
      <div className="h-full sm:h-[80vh] overflow-y-scroll w-full no-scrollbar flex flex-col-reverse">
        {validMessages.map((message) => (
          <MessageView
            key={message.id}
            message={message}
            isSentByMe={message.sent_by === username}
          />
        ))}
      </div>
    </>
  );
}

export default MessagesPanel;
