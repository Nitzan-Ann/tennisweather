export function decideCourtType(weatherData, windThreshold = 25, humidityThreshold = 85) {
  const windSpeed = weatherData.wind.speed;
  const isRaining = weatherData.weather[0].main === "Rain";
  const temp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;

  if (isRaining) {
    return { recommendation: "indoor", reason: "Rain detected" };
    //זה יוצר אובייקט עם שני שדות: recommendation (המחרוזת "indoor" או "outdoor") ו-reason 
  }

  if (windSpeed > windThreshold) {
    return { recommendation: "indoor", reason: `Wind speed ${windSpeed} m/s exceeds threshold` };
  }

  if (temp < 5 || temp > 35) {
    return { recommendation: "indoor", reason: `Temperature ${temp}°C is extreme` };
  }

  if (humidity > humidityThreshold) {
    return { recommendation: "indoor", reason: `Humidity ${humidity}% is too high for comfortable play` };
  }

  return { recommendation: "outdoor", reason: "Weather conditions are favorable" };
}