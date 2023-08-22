import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PerksComp from "./PerksComp";
import axios from "axios";

import PhotosUploader from "../PhotosUploader";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const [desc, setDesc] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("00:00");
  const [checkOut, setCheckOut] = useState("00:00");
  const [maxGuests, setMaxGuests] = useState(1);

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
    const { data } = await axios.post("/places", {
      title,
      address,
      photos,
      linkPhoto,
      desc,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    console.log(data);
  };
  return (
    <>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
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
          {<PhotosUploader photos={photos} linkPhoto={linkPhoto} />}
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
      )}
    </>
  );
};

export default PlacesPage;
