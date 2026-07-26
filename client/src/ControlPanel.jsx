export default function ControlPanel({ courts, city, setCity,
        windThreshold, setWindThreshold,
        humidityThreshold, setHumidityThreshold,
        minTemp, setMinTemp,
        maxTemp, setMaxTemp }) {

    const cities = [...new Set(courts.map(c => c.city))];

    return (
        <div className="control-panel">
            <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Select a city</option>
                {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <div className="slider-row">
                <label>Wind threshold: {windThreshold} m/s</label>
                <div className="slider-row-track">
                    <input type="range" min={0} max={50} value={windThreshold} onChange={(e) => setWindThreshold(Number(e.target.value))} />
                    <span>0-50</span>
                </div>
            </div>

            <div className="slider-row">
                <label>Humidity threshold: {humidityThreshold}%</label>
                <div className="slider-row-track">
                    <input type="range" min={40} max={100} value={humidityThreshold} onChange={(e) => setHumidityThreshold(Number(e.target.value))} />
                    <span>40-100</span>
                </div>
            </div>

            <div className="slider-row">
                <label>Min temperature: {minTemp}°C</label>
                <div className="slider-row-track">
                    <input type="range" min={0} max={20} value={minTemp} onChange={(e) => setMinTemp(Number(e.target.value))} />
                    <span>0-20</span>
                </div>
            </div>

            <div className="slider-row">
                <label>Max temperature: {maxTemp}°C</label>
                <div className="slider-row-track">
                    <input type="range" min={25} max={45} value={maxTemp} onChange={(e) => setMaxTemp(Number(e.target.value))} />
                    <span>25-45</span>
                </div>
            </div>
        </div>
    );
}