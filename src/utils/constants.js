export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../images/Day/Clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../images/Day/Cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../images/Day/Fog.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../images/Day/Rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../images/Day/Snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../images/Day/Storm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../images/Night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../images/Night/Cloudy_night.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../images/Night/Foggy_night.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../images/Night/Rainy_night.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../images/Night/Snowy_night.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL("../images/Night/Stormy_night.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../images/Day/day_rect.png", import.meta.url).href,
  },
  night: {
    url: new URL("../images/Night/night_rect.png", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 34.136002,
  longitude: -117.865494,
};

export const APIkey = "e0ff45fb03c54d35f7a8269023fff51a";
