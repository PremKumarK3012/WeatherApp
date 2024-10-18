import React from "react";
import "./weatherDetails.css";

import humidit from "./assets/water-drop.png";
import winds from "./assets/sky.png";

export const WeatherDetails = ({
  image,
  temp,
  city,
  country,
  lat,
  lon,
  humidity,
  wind,
}) => {
  return (
    <>
      <div className="image">
        <img src={image} alt="clear" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Logitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidit} alt="humidity" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={winds} alt="wind" />
          <div className="data">
            <div className="wind-percent">{wind}%</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};
