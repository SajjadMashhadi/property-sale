import { FC } from "react";

interface EmptyPageProps {
  text: string;
}

const EmptyPage: FC<EmptyPageProps> = ({ text }) => {
  return <div className="w-3/4 flex items-center justify-center">{text}</div>;
};

export default EmptyPage;
