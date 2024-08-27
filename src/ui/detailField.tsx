import { FC } from "react";

interface DetailFieldsProps {
  title: string;
  content: string | number;
}

const DetailFields: FC<DetailFieldsProps> = ({ title, content }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between ">
      <div className="w-full sm:w-1/3">{title}: </div>
      <div className="w-full sm:w-2/3 dark:text-white">{content}</div>
    </div>
  );
};

export default DetailFields;
