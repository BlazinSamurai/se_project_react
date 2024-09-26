import React from "react";

const CurrentTempUnitContext = React.createContext({
  currentTempUnit: "",
  handleToggleSwitchChange: () => {},
});

// adding curry braces means your extracting a object
export { CurrentTempUnitContext };
