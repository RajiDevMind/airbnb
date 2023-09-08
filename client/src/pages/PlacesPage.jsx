import { Link } from "react-router-dom";
import AcctNav from "../AcctNav";
import { useEffect, useState } from "react";
import axios from "axios";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places", { withCredentials: true }).then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <>
      <AcctNav />
      <div className="text-center">
        <h6 className="text-lg">List of all added places</h6>
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
        <div key={places.data} className="mt-4">
          {places.length > 0 &&
            places.map((place) => (
              <div key={place.id}>
                <Link
                  to={"/account/places/" + places.id}
                  key={place.id}
                  className="cursor-pointer flex gap-4 text-2xl bg-gray-200 p-4 rounded-2xl"
                >
                  <div className="w-32 h-32 bg-gray-100 shrink-0">
                    {place.photos > 0 && <img src={place.photos[0]} alt="" />}
                  </div>
                  <div className="grow-0 shrink">
                    <h2 className="text-2xl text-left">{place.title}</h2>
                    <p className="text-sm mt-2 text-left">{place.desc}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PlacesPage;
