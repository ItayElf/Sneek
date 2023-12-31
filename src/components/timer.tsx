import { useEffect, useState } from "react";

interface Props {
  timestamp: number;
  className?: string;
}

const getFormattedDuration = (difference: number) => {
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

function Timer({ timestamp, className }: Props) {
  const [difference, setDifference] = useState(timestamp - Date.now());

  useEffect(() => {
    const intervalId = setInterval(
      () => setDifference(Math.max(timestamp - Date.now(), 0)),
      500
    );
    return () => clearInterval(intervalId);
  }, [setDifference, timestamp]);

  return (
    <span className={className ?? ""}>{getFormattedDuration(difference)}</span>
  );
}

export default Timer;
