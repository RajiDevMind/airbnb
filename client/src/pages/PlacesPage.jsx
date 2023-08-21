import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PerksComp from "./PerksComp";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhoto] = useState([]);
  const [linkPhoto, setLinkPhoto] = useState("");
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

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: linkPhoto,
    });
    setPhoto((prev) => {
      return [...prev, filename];
    });
    setLinkPhoto("");
  };

  const uploadPhoto = async (e) => {
    const file = e.target.files;
    console.log(file);
    const data = new FormData();
    for (let i = 0; i < file.length; i++) {
      data.append("photos", file[i]);
    }
    const response = await axios.post("/upload", data, {
      headers: { "Content-type": "multipart/form-data" },
    });
    if (response) {
      const filenames = response.data;
      setPhoto((prev) => {
        return [...prev, ...filenames];
      });
    }
    // .then((response) => {
    //   const { files: filenames } = response;
    //   setPhoto((prev) => {
    //     return [...prev, ...filenames];
    //   });
    // });
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
        <form>
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
          {preInput("Photos", "Descriptive images for your place")}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={"Add using link ....jpg"}
              value={linkPhoto}
              onChange={(e) => {
                setLinkPhoto(e.target.value);
              }}
            />
            <button
              onClick={addPhotoByLink}
              className="rounded-2xl bg-gray-200 px-4"
            >
              Add&nbsp;photos
            </button>
          </div>
          <div className=" mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {photos.length > 0 &&
              photos.map((link) => (
                <div children="h-32 flex" key={link.size}>
                  <img
                    className="rounded-2xl w-full object-cover position-center"
                    src={"http://localhost:4000/uploads/" + link}
                    alt=""
                  />
                </div>
              ))}
            <label className=" h-32 cursor-pointer flex items-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={uploadPhoto}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.0}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Upload
            </label>
          </div>
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
