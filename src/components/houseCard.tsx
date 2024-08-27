import { Link, useLocation } from "react-router-dom";

export default function HouseCard({
  address,
  id,
}: {
  address: string;
  id: number;
}) {
  const location = useLocation();
  return (
    <Link
      className="w-full md:w-[250px] lg:w-[250px] 2xl:w-[300px]  xl:w-[250px] border-2 border-solid border-[#f8f8f8] text-gray-600   h-[200px] dark:border-none hover:border-[#f2f2f2]  dark:bg-gray-700 dark:hover:bg-[#2e3441] bg-gray-50 flex justify-between p-[10px] rounded-[5px]"
      to={`${location.pathname}/${id}`}
    >
      <div>
        <span className="font-bold dark:text-gray-400 ">Address: </span>
        <span className="dark:text-gray-100">{address}</span>
      </div>
    </Link>
  );
}
