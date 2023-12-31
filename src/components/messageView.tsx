import Message from "../interfaces/message";
import MessageTimer from "./messageTimer";

interface Props {
  message: Message;
  isSentByMe: boolean;
}

function MessageView({ message, isSentByMe }: Props) {
  return (
    <>
      <div className={`w-full mb-4 flex ${isSentByMe ? "justify-end" : ""}`}>
        <div className={`flex w-full ${isSentByMe ? "flex-row-reverse" : ""}`}>
          <MessageTimer
            sentAt={new Date(message.sent_at * 1000)}
            expiredAt={new Date(message.expired_at * 1000)}
          />
          <div
            className={`p-4 rounded-xl max-w-[60%] block ${
              isSentByMe ? "bg-primary" : "bg-background-light2"
            }`}
          >
            <span className={isSentByMe ? "hidden" : "s2 sm:s1 text-primary"}>
              {message.sent_by.replace(/\b\w/g, (match) => match.toUpperCase())}
            </span>
            <p className="s1 sm:h5">{message.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageView;
