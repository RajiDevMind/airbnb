import { useState } from "react";
import PerksComp from "./PerksComp";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import AcctNav from "../AcctNav";
import { Navigate } from "react-router-dom";

const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const [photos, setPhoto] = useState([]);

  const [desc, setDesc] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("00:00");
  const [checkOut, setCheckOut] = useState("00:00");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-2">{text}</h2>;
  };
  const inputDesc = (text) => {
    return <p className="text-gray-400 text-sm">{text}</p>;
  };
  const preInput = (header, desc) => {
    return (
      <>
        {inputHeader(header)}
        {inputDesc(desc)}
      </>
    );
  };

  const addNewPlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      photos,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    await axios.post("/places", placeData, { withCredentials: true });
    // alert("Successfully set your place");
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <div>
      <AcctNav />
      <form onSubmit={addNewPlace}>
        {preInput(
          "Title",
          "Title for your place, should be short and catchy for advertisement"
        )}
        <input
          type="text"
          placeholder="title, for example: my lovely apartment"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {preInput("Address", "Address to your place")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        {preInput("Photos", "more = better")}
        {<PhotosUploader photos={photos} onChange={setPhoto} />}
        {preInput("Description", "Description of the place")}
        <textarea
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        {<PerksComp selected={perks} onChange={setPerks} />}
        {preInput("Extra info", "house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => {
            setExtraInfo(e.target.value);
          }}
        />
        {preInput(
          "Check In&Out times",
          "add check in and out times, remember to add some time window for cleaning guests rooms"
        )}
        {/* <textarea /> */}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="time"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="time"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => {
                setMaxGuests(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
