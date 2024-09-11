import moonlight from "../../images/moonlight.png";

import "./WeatherCard.css";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img src={moonlight} alt="moonlight" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
