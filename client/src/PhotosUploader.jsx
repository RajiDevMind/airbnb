import React from "react";
import axios from "axios";
import { useState } from "react";

const PhotosUploader = (photos, linkPhoto) => {
  const [photos, setPhoto] = useState([]);
  const [linkPhoto, setLinkPhoto] = useState("");

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
  };
  return (
    <>
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
            <div children="h-32 flex" key={link}>
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
    </>
  );
};

export default PhotosUploader;
