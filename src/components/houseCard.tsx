import { Link } from "react-router-dom";

export default function HouseCard({
  address,
  id,
}: {
  address: string;
  id: number;
}) {
  return (
    <Link
      className="w-full min-h-[60px] h-fit dark:bg-gray-700 bg-gray-50 flex items-center p-[10px] rounded-[5px]"
      to={`/houses/${id}`}
    >
      <div>
        <span className="font-bold dark:text-white">Address: </span>
        {address}
      </div>
    </Link>
  );
}
