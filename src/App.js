import logo from "./logo.svg";
import "./App.css";

import ClearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import DrizzleIcon from "./assets/drizzle.png";
import HumidityIcon from "./assets/humidity.png";
import RainIcon from "./assets/rain.jpg";
import SerchIcon from "./assets/search.png";
import SnowIcon from "./assets/snow.jpg";
import WindIcon from "./assets/wind.jpg";
import { useState } from "react";

const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="clear" />
      </div>
      <div className="temp">{temp} °C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={HumidityIcon} alt="Humidity" className="icon"/>
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={WindIcon} alt="Wind" className="icon"/>
          <div className="data">
            <div className="wind-percent">{wind} Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};
function App() {
  const [icon, setIcon] = useState(ClearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("chennai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0)
  const [wind, setWind] = useState(0)
  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Serach City"
            value={city}
          />
          <div className="search-icon">
            <img src={SerchIcon} alt="serch icon" width={20} />
          </div>
        </div>
        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          log={log}
          humidity={humidity}
          wind={wind}
        />
      </div>
    </>
  );
}

export default App;
