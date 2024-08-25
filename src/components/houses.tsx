import { useState } from "react";
import { useHouses } from "../api/useFetch";

import HouseCard from "./houseCard";

interface house {
  id: number;
  address: string;
  description: string;
}

const limit = 7;

export default function Houses() {
  const [page, setPage] = useState<number>(1);

  const { data: houses, dataLength, isPending, error } = useHouses(page, limit);

  const totalPages = Math.ceil(dataLength / limit);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((page) => page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  if (error) {
    return <div>error</div>;
  }

  if (isPending) {
    return <div>is loading...</div>;
  }

  if (houses && houses.length === 0) {
    return (
      <div className="w-3/4 flex items-center justify-center">
        No House added!
      </div>
    );
  }

  if (houses) {
    return (
      <div className="w-3/4 min-h-screen overflow-auto flex flex-col justify-between gap-[20px] p-[50px]">
        <div className=" flex flex-col gap-[20px] ">
          {houses.map((house: house) => (
            <HouseCard key={house.id} address={house.address} id={house.id} />
          ))}
        </div>
        <div className="flex flex-row justify-center">
          <div className="w-[500px] flex flex-row justify-around">
            <button onClick={() => handlePreviousPage()}>previous page</button>
            <div>
              page {page} of {totalPages}
            </div>
            <button onClick={() => handleNextPage()}>next page</button>
          </div>
        </div>
      </div>
    );
  }
}
