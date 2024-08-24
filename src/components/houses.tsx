import useFetch from "../api/useFetch";

import HouseCard from "./houseCard";

interface house {
  id: number;
  address: string;
  description: string;
}

export default function Houses() {
  //   const [houses, setHouses] = useState<house[] | null>();

  const {
    data: houses,
    isPending,
    error,
  } = useFetch("http://localhost:3000/houses");

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
      <div className="w-3/4 flex flex-col gap-[20px] p-[20px]">
        {houses.map((house: house) => (
          <HouseCard key={house.id} address={house.address} id={house.id} />
        ))}
      </div>
    );
  }
}
