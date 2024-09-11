// wrapper for the whole application
// therefore, is the parent of other top-level components
import { useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";

function App() {
  //set default value to "cold", normally it would be empty ""
  const [weatherData, setweatherData] = useState({ type: "cold" });

  return (
    <div className="page">
      <div className="page_content">
        <Header />
        <Main weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
