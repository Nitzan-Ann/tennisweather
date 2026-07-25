import { useState, useEffect } from "react";
import Courts from "./Courts";
import ControlPanel from "./ControlPanel";

export default function App() {
  const [city, setCity] = useState("");
  const [courts, setCourts] = useState([]);
  const [decision, setDecision] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [windThreshold, setWindThreshold] = useState(25);
  const [humidityThreshold, setHumidityThreshold] = useState(85);
  const [minTemp, setMinTemp] = useState(5);
  const [maxTemp, setMaxTemp] = useState(35);

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        setLoading(true);

        const url = city?
            `http://localhost:8000/api/recommendation?city=${city}&windThreshold=${windThreshold}&humidityThreshold=${humidityThreshold}&minTemp=${minTemp}&maxTemp=${maxTemp}`
          : `http://localhost:8000/api/courts`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Server error: " + res.status);
        }
        const data = await res.json();

        if (city) {
          setCourts(data.courts);
          setDecision(data.decision);
        } else {
          setCourts(data);
          setDecision(null);
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("We couldn't load the data, try again later");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [city, windThreshold, humidityThreshold, minTemp, maxTemp]);

  return (
    <div className="app">
      <ControlPanel
        city={city}
        setCity={setCity}
        windThreshold={windThreshold}
        setWindThreshold={setWindThreshold}
        humidityThreshold={humidityThreshold}
        setHumidityThreshold={setHumidityThreshold}
        minTemp={minTemp}
        setMinTemp={setMinTemp}
        maxTemp={maxTemp}
        setMaxTemp={setMaxTemp}
      />
      <Courts courts={courts} decision={decision} loading={loading} error={error} />
    </div>
  );
}