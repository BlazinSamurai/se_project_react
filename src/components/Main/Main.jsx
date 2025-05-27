import "./Main.css";

import { useContext } from "react";
import { CurrentTempUnitContext } from "../../Context/CurrentTempUnitContext";

import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({
  currentUser,
  weatherData,
  onCardClick,
  clothingItems,
  onHeartClick,
}) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTempUnit === "F" ? weatherData.temp.F : weatherData.temp.C}
          &deg;
          {currentTempUnit === "F" ? "F" : "C"}/ You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  currentUser={currentUser}
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                  onHeartClick={onHeartClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
