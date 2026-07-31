export default function Courts({ courts, decision, weather, loading, error }) {

  if (loading) return <p className="Loading-Courts">Loading Courts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="court-page">
      {decision && (
        <div className="decision-banner">
          <p>Recommendation: {decision.recommendation}</p>
          <p>{decision.reason}</p>
          {weather && (
            <p className="weather-details">
              Current conditions: {weather.main.temp}°C, wind: {weather.wind.speed} m/s, humidity: {weather.main.humidity}%
            </p>
          )}
        </div>
      )}
      {courts.length === 0 ? (
        <p>No courts found</p>
      ) : (
        courts.map((c) => (
          <div key={c.id} className="court-card">
            <div className="court-card-details">
              <p>{c.name}</p>
              <p>({c.city})</p>
              <p>{c.address}</p>
              <p>{c.indoor ? "Indoor" : "Outdoor"}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}