import React from "react";
import { UilSearch, UilMapMarker } from "@iconscout/react-unicons";
import { useState } from "react";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;

    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;

        setQuery({ lat, lon });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row items-center justify-center w-3/4 space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="City"
          className="w-full p-2 text-xl font-light capitalize rounded-md shadow-xl focus:outline-none"
        />
        <UilSearch
          onClick={handleSearchClick}
          size={25}
          className="text-white transition ease-out cursor-pointer hover:scale-125"
        />
        <UilMapMarker
          onClick={handleLocationClick}
          size={25}
          className="text-white transition ease-out cursor-pointer hover:scale-125"
        />
      </div>

      <div className="flex flex-row items-center justify-center w-1/4">
        <button
          name="metric"
          className="text-xl font-light text-white transition ease-out cursor-pointer hover:scale-125"
          onClick={handleUnitChange}
        >
          °C
        </button>
        <p className="mx-2 text-xl text-white"></p>
        <button
          name="imperial"
          className="text-xl font-light text-white transition ease-out cursor-pointer hover:scale-125"
          onClick={handleUnitChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
