import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [wDetails, setWdetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault(); // Prevents form from refreshing the page

    if (!city.trim()) {
      alert("Please enter a city name first.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`
      );
      const finalres = await response.json();

      if (finalres.cod === 200) {
        setWdetails(finalres);
      } else {
        setWdetails(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWdetails(null);
    }

    setIsLoading(false);
    setCity(""); // Reset input field
  };

  return (
    <div className="App">
      <div>
        <h1>CHECK WEATHER OF ANY CITY HERE</h1>

        <form>
          <input
            type="text"
            className="input"
            placeholder="Enter the city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="button-85" onClick={handleClick}>
            Check Weather
          </button>
        </form>

        <div className="showData">
        <div className="data">
          {isLoading && (
            <img
              src="https://cdn.dribbble.com/users/2973561/screenshots/5757826/loading__.gif"
              className="loading"
              alt="Loading..."
            />
          )}

          {wDetails ? (
            <>
              <h3>
                {wDetails.name} <span>{wDetails.sys.country}</span>
              </h3>
              <h2>
                Temp: &emsp; {wDetails.main.temp} &ensp;
                <span>
                  <sup>o</sup>C
                </span>
              </h2>
              <img
                 className="logoImg"
                src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
                alt="Weather icon"
              />
              <p>{wDetails.weather[0].description}</p>
              <h3>
                Max Temp: {wDetails.main.temp_max} <sup>o</sup>C
              </h3>
              <h3>
                Min Temp: {wDetails.main.temp_min} <sup>o</sup>C
              </h3>
            </>
          ) : (
            !isLoading && <h1 className="NoData">NO Data Found</h1>
          )}
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
