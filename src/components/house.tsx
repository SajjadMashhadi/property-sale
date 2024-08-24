import { useParams } from "react-router-dom";
import useFetch from "../api/useFetch";

export default function House() {
  const { id } = useParams();
  const {
    data: house,
    error,
    isPending,
  } = useFetch("http://localhost:3000/houses/" + id);

  if (error) {
    return <div>error</div>;
  }

  if (isPending) {
    return <div>is loading...</div>;
  }

  if (house) {
    return (
      <div>
        <div>{house.id}</div>
        <div>{house.address}</div>
        <div>{house.description}</div>
      </div>
    );
  }
}
