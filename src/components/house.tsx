import { useParams } from "react-router-dom";
import { deleteHouse, useHouse } from "../api/useFetch";
import DetailFiels from "./detailField";
import EmptyPage from "./emptyPage";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import Button from "./button";
import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddHouse from "./addHouse";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    padding: "0",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadious: "5px",
  },
};

export default function House() {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const { id } = useParams();
  const navigateTo = useNavigate();

  const { data: house, error, isPending } = useHouse(id);

  const handleDelete = () => {
    if (id) {
      deleteHouse(id)
        .then(() => navigateTo("/"))
        .catch((err) => console.log(err));
    }
  };

  if (error) {
    return <EmptyPage text="Error! Please try again later." />;
  }

  if (isPending) {
    return <EmptyPage text="Loading..." />;
  }

  if (house) {
    return (
      <div className="w-full overflow-auto lg:w-3/4 p-[20px] py-[20px]  sm:p-[50px]">
        <div className="w-full xl:w-[800px] flex flex-col gap-[20px]">
          <h1 className="font-bold text-xl w-full text-center lg:text-left ">
            House Details
          </h1>
          <DetailFiels title="Address" content={house.address} />
          <DetailFiels title="Description" content={house.description} />
          <DetailFiels title="Phone" content={house.phone} />
          <MapContainer
            className="h-[300px] w-full  rounded-[5px] z-0"
            center={[house.position.lat, house.position.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker draggable={false} position={house.position}></Marker>
          </MapContainer>
          <div className="flex flex-col sm:flex-row justify-start gap-[20px]">
            <Button text="edit" onClick={() => setEditModal(true)} />
            <Button onClick={() => setDeleteModal(true)} text="remove" />
          </div>
          <Modal
            ariaHideApp={false}
            isOpen={deleteModal}
            onAfterOpen={() => setDeleteModal(true)}
            onRequestClose={() => setDeleteModal(false)}
            style={customStyles}
          >
            <div className="dark:bg-gray-800 dark:text-gray-400 w-[300px] sm:w-[400px] p-[20px]  flex flex-col gap-[20px] items-center">
              <p>Do you want to remove this item?</p>
              <div className="flex flex-row justify-start gap-[20px]">
                <Button text="no" onClick={() => setDeleteModal(false)} />
                <Button text="yes" onClick={() => handleDelete()} />
              </div>
            </div>
          </Modal>
          <Modal
            ariaHideApp={false}
            isOpen={editModal}
            onAfterOpen={() => setEditModal(true)}
            onRequestClose={() => setEditModal(false)}
            style={customStyles}
          >
            <AddHouse handleClose={() => setEditModal(false)} house={house} />
          </Modal>
        </div>
      </div>
    );
  }
}
