import React, { useContext } from "react";
import { useEffect, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTempUnitContext } from "../Context/CurrentTempUnitContext";

const ToggleSwitch = () => {
  // const [currentTempUnit, handleTempToggle] = useState("C");

  // const handleChange = (e) => {
  //   if (currentTempUnit === "C") {
  //     handleTempToggle("F");
  //   } else {
  //     handleTempToggle("C");
  //   }
  // };

  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />{" "}
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTempUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTempUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
