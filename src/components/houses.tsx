import { FC, useEffect, useState } from "react";
import HouseCard from "./houseCard";
import EmptyPage from "../ui/emptyPage";
import Button from "../ui/button";
import { useHouses } from "../api/useFetch";
import { useLocation } from "react-router-dom";

//number items in each page
const limit = 6;

interface HousesProps {
  userHouses: boolean;
}

const Houses: FC<HousesProps> = ({ userHouses }) => {
  const [page, setPage] = useState<number>(1);

  const {
    data: houses,
    dataLength,
    isPending,
    error,
  } = useHouses(page, limit, userHouses);

  const location = useLocation();

  //calculate the total pages of items
  const totalPages: number = dataLength ? Math.ceil(dataLength / limit) : 1;

  const handleNextPage = (): void => {
    if (page < totalPages) {
      setPage((page: number) => page + 1);
    }
  };

  const handlePreviousPage = (): void => {
    if (page > 1) {
      setPage((page: number) => page - 1);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [location.pathname]);

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
      <div className="  w-full lg:w-3/4 sm:items-center min-h-screen overflow-auto flex flex-col justify-between gap-[20px] py-[20px] px-[10px] sm:p-[50px]">
        <h1 className="m-y-[10px] text-xl font-bold text-center lg:hidden">
          Houses
        </h1>
        <div className=" w-full md:w-[600px] lg:w-[650px] xl:w-[850px] 2xl:w-[1000px] flex flex-row flex-wrap gap-[20px] px-[30px] pt-[50px]  ">
          {houses.map((house) => (
            <HouseCard key={house.id} address={house.address} id={house.id} />
          ))}
        </div>
        <div className="flex flex-row justify-center">
          <div className="w-[500px] flex flex-col sm:flex-row justify-around">
            <Button text="previous" onClick={() => handlePreviousPage()} />
            <div className="h-[40px] flex items-center justify-center w-full">
              page {page} of {totalPages}
            </div>
            <Button text="next" onClick={() => handleNextPage()} />
          </div>
        </div>
      </div>
    );
  }
};

export default Houses;
