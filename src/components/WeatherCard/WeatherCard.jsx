import "./WeatherCard.css";

import { useContext } from "react";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../Context/CurrentTempUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  // ? is for if filteredOptions is undefined or empy
  // then dont get the url, options chaining I
  //believe is what he called it
  // const weatherOptionUrl = filteredOptions[0]?.url;

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      {/* <p className="weather-card__temp"> {weatherData.temp.F} &deg; F</p> */}
      <p className="weather-card__temp">
        {currentTempUnit === "F" ? weatherData.temp.F : weatherData.temp.C}
        &deg;
        {currentTempUnit === "F" ? "F" : "C"}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}
        time ${weatherOption?.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
