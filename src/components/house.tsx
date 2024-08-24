import { useParams } from "react-router-dom";
import useFetch from "../api/useFetch";
import DetailFiels from "./detailField";

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
      <div className="w-3/4 p-[50px]">
        <h1 className="font-bold text-xl w-full pl-[20px]">House Details</h1>
        <DetailFiels title="Address" content={house.address} />
        <DetailFiels title="Description" content={house.description} />
      </div>
    );
  }
}
