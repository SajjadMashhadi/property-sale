import useFetch from "../api/useFetch";
import { Link } from "react-router-dom";

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

  if (houses) {
    return (
      <div>
        {houses.map((house: house) => (
          <Link key={house.id} to={`/houses/${house.id}`}>
            <div>{house.address}</div>
          </Link>
        ))}
      </div>
    );
  }
}
