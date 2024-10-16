export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  let wholeNumTemp = Math.trunc(data.main.temp);
  // result.temp = {
  //   F: wholeNumTemp,
  //   C: Math.trunc((wholeNumTemp - 32) * (5 / 9)),
  // };
  result.temp = { F: 72 };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 75) {
    return "hot";
  } else if (temperature > 69 && temperature < 75) {
    return "warm";
  } else {
    return "cold";
  }
};
