import { FormEvent, useCallback, useState } from "react";
import { API_URL } from "../config";
import { toast } from "react-toastify";

interface Props {
  token: string;
}

function ChannelFooter({ token }: Props) {
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);

  const sendMessage = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!content || !isActive) {
        return;
      }
      setIsActive(false);
      const response = await fetch(API_URL + "messages/text", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        toast.error(await response.text());
        return;
      }
      setIsActive(true);
      setContent("");
    },
    [content, isActive, token]
  );

  return (
    <form
      className="p-4 bg-primary w-full flex h6 sm:h5 text-background"
      onSubmit={sendMessage}
    >
      <input
        className="w-full rounded bg-primary-light px-4 placeholder:text-background/50 focus:outline-none focus:border-none focus:ring-2 focus:ring-background"
        placeholder="Type Something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input>
      <button
        className="ml-4 font-bold btn disabled:text-background/50"
        disabled={!isActive}
      >
        SEND
      </button>
    </form>
  );
}

export default ChannelFooter;
