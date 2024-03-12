import "./App.css";
import PropTypes from "prop-types";

import ClearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import DrizzleIcon from "./assets/drizzle.png";
import HumidityIcon from "./assets/humidity.png";
import RainIcon from "./assets/rain.jpg";
import SerchIcon from "./assets/search.png";
import SnowIcon from "./assets/snow.jpg";
import WindIcon from "./assets/wind.jpg";
import { useEffect, useState } from "react";

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

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
  };

function App() {
  let apiKey = '1604c0412923879ec57a89fc14b5d34f';
  const [text,setText] = useState('London'); 
  const [icon, setIcon] = useState(ClearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("London");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0)
  const [wind, setWind] = useState(0)
  const [loading, setLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);

  const weatherIconMap = {
    "01d": ClearIcon,
    "01n": ClearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": DrizzleIcon,
    "03n": DrizzleIcon,
    "04d": DrizzleIcon,
    "04n": DrizzleIcon,
    "09d": RainIcon,
    "09n": RainIcon,
    "10d": RainIcon,
    "10n": RainIcon,
    "13d": SnowIcon,
    "13n": SnowIcon,
    };

  const search = async () => {
    setLoading(true)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&Units=Metric`;
    try
    {
        let res = await fetch(url);
        let data = await res.json();
        if(data.cod === '404')
        {
          setCityNotFound(true)
          setLoading(false);
          return;
        }

        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setTemp(Math.floor(data.main.temp))
        setCity(data.name)
        setCountry(data.sys.country);
        setLat(data.coord.lat)
        setLog(data.coord.lon);
        const iconCode = data.weather[0].icon;
        setIcon(weatherIconMap[iconCode] || ClearIcon)
        setCityNotFound(false);
    }
    catch(err)
    {
      console.log('An Error occurred: ', err.message)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(function(){
    search();
  }, [])

  const handleCity = (e) => {
    setText(e.target.value)
  }

  const handleKeyDown = (e) => {
     if(e.key === 'Enter')
     {
        search();
     }
  }

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Serach City"
            onChange={handleCity}
            onKeyDown={handleKeyDown}
            value={text}
          />
          <div className="search-icon" onClick={() => search()}>
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
