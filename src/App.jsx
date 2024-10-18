import React, { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./assets/search.png";
import cloud from "./assets/cloudy.png";
import drizzle from "./assets/drizzle.png";
import rain from "./assets/rainy-day.png";
import snow from "./assets/snowy.png";
import clear from "./assets/clear.png";
import { WeatherDetails } from "./WeatherDetails.jsx";

const App = () => {
  let api_key = "839a148862ce70f9da77e54a070c4327";
  const [loading, setLoading] = useState(false);
  const [cityNotfound, setCitynotfound] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("Kalugumalai");
  const [icon, setIcon] = useState("");
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, sethumidity] = useState(0);
  const [wind, setwind] = useState(0);

  const weatherIconmap = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric
`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);
      if (data.cod === "404") {
        console.log("City Not Found");
        setCitynotfound(true);
        setLoading(false);
        return;
      }

      setTemp(data.main.temp);
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      sethumidity(data.main.humidity);
      setwind(data.wind.speed);

      const weatherIconcode = data.weather[0].icon;
      setIcon(weatherIconmap[weatherIconcode] || clear);
      setCitynotfound(false);
    } catch (error) {
      console.error("An error occured", error);
      setError("An error occured for fetching weather data...");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handlekey = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(function () {
    search();
  }, []);

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search City"
            className="cityInput"
            onChange={handleCity}
            onKeyDown={handlekey}
            value={text}
          />
          <div className="searchIcon">
            <img
              className="search"
              src={searchIcon}
              alt="searchIcon"
              onClick={() => search()}
            />
          </div>
        </div>

        {loading && <div className="notfound">Loading..</div>}
        {error && <div className="notfound">{error}</div>}
        {cityNotfound && <div className="notfound">CityNotFound</div>}
        {!loading && !cityNotfound && (
          <WeatherDetails
            image={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            lon={lon}
            humidity={humidity}
            wind={wind}
          />
        )}
        <p className="copyright">
          Designed By <span>Prem Kumar</span>
        </p>
      </div>
    </>
  );
};

export default App;
