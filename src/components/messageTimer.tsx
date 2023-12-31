import { useEffect, useState } from "react";

const getPath = (percentage: number) => {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const radians = (clampedPercentage / 100) * (2 * Math.PI);

  const radius = 40;
  const centerX = 50;
  const centerY = 50;
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + radians;

  const startX = centerX + radius * Math.cos(startAngle);
  const startY = centerY + radius * Math.sin(startAngle);
  const endX = centerX + radius * Math.cos(endAngle);
  const endY = centerY + radius * Math.sin(endAngle);

  const largeArcFlag = radians > Math.PI ? 1 : 0;
  const pathData = `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius}, 0, ${largeArcFlag}, 1, ${endX} ${endY} Z`;

  return pathData;
};

interface Props {
  sentAt: Date;
  expiredAt: Date;
}

function MessageTimer({ sentAt, expiredAt }: Props) {
  const difference = expiredAt.getTime() - sentAt.getTime();
  const passed = new Date().getTime() - sentAt.getTime();
  const [percentage, setPercentage] = useState(
    100 - (passed / difference) * 100
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const difference = expiredAt.getTime() - sentAt.getTime();
      const passed = new Date().getTime() - sentAt.getTime();
      setPercentage(100 - (passed / difference) * 100);
    }, 50);
    return () => clearInterval(intervalId);
  });

  return (
    <svg
      className="w-12 h-12 fill-primary scale-x-[-1]"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={getPath(percentage)} />
    </svg>
  );
}

export default MessageTimer;
