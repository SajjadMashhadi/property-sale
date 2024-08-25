import { useState } from "react";
import { useHouses } from "../api/useFetch";

import HouseCard from "./houseCard";
import EmptyPage from "./emptyPage";
import Button from "./button";

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
    return <EmptyPage text="Error! Please try again later." />;
  }

  if (isPending) {
    return <EmptyPage text="Loading..." />;
  }

  if (houses && houses.length === 0) {
    return <EmptyPage text="No house added." />;
  }

  if (houses) {
    return (
      <div className="  w-full lg:w-3/4 min-h-screen overflow-auto flex flex-col justify-between gap-[20px] p-[50px]">
        <h1 className="m-y-[10px] text-xl font-bold text-center lg:none">
          Houses
        </h1>
        <div className=" flex flex-col gap-[20px] ">
          {houses.map((house: house) => (
            <HouseCard key={house.id} address={house.address} id={house.id} />
          ))}
        </div>
        <div className="flex flex-row justify-center">
          <div className="w-[500px] flex flex-row justify-around">
            <Button text="previous" onClick={() => handlePreviousPage()} />
            <div className="h-[40px] flex items-center">
              page {page} of {totalPages}
            </div>
            <Button text="next" onClick={() => handleNextPage()} />
          </div>
        </div>
      </div>
    );
  }
}
