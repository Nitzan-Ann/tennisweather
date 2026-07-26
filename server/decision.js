export function decideCourtType(weatherData, windThreshold = 25, humidityThreshold = 85, minTemp = 5, maxTemp = 35) {
  const windSpeed = weatherData.wind.speed;
  const isRaining = weatherData.weather[0].main === "Rain";
  const temp = weatherData.main.temp;
  const humidity = weatherData.main.humidity;

  if (isRaining) {
    return { recommendation: "indoor", reason: "Rain detected" };
  }

  if (windSpeed > windThreshold) {
    return { recommendation: "indoor", reason: `Wind speed ${windSpeed} m/s exceeds threshold` };
  }

  if (temp < minTemp || temp > maxTemp) {
    return { recommendation: "indoor", reason: `Temperature ${temp}°C is outside comfortable range` };
  }

  if (humidity > humidityThreshold) {
    return { recommendation: "indoor", reason: `Humidity ${humidity}% is too high for comfortable play` };
  }

  return { recommendation: "outdoor", reason: "Weather conditions are favorable" };
}