import "./Main.css";

import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { CurrentTempUnitContext } from "../Context/CurrentTempUnitContext";

function Main({ weatherData, handleCardClick }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  console.log(currentTempUnit);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          {/* Today is {weatherData.temp.F} &deg; F / You may want to wear: */}
          Today is{" "}
          {currentTempUnit === "F" ? weatherData.temp.F : weatherData.temp.C}
          &deg;
          {currentTempUnit === "F" ? "F" : "C"}/ You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              // you can name the prop anything you want. I.e "item"
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
