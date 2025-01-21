import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Modal from "./Modal";

const WorldMap = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [geoData, setGeoData] = useState(null);
  const [clickedCountries, setClickedCountries] = useState([]);
  const [inputCountry, setInputCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [resulttext, setResulttext] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch GeoJSON data when the component mounts
    fetch("https://anj-oo.github.io/worldmap/geo.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Error fetching GeoJSON:", error));
  }, []);

  const resetAllState = () => {
    setInputCountry("");
    setSelectedCountry("");
    setResulttext("");
  };

  const handleCountryClick = (geo) => {
    resetAllState();
    const countryStringify = JSON.stringify(geo);
    const countryClicked = JSON.parse(countryStringify).properties.name;
    if (clickedCountries[countryClicked] === "#28a745") return; // If color is green, prevent click

    setSelectedCountry(countryClicked);
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const matchResult =
      inputCountry.trim().localeCompare(selectedCountry.trim(), undefined, {
        sensitivity: "accent",
      }) === 0;

    if (matchResult) {
      setResulttext("🎉 Correct Answer!");
      setScore(score + 1);
    } else {
      setResulttext("❌ Wrong Answer!");
    }

    setClickedCountries((prevClickedCountries) => ({
      ...prevClickedCountries,
      [selectedCountry]: matchResult ? "#28a745" : "#FF6347", // Green if match , Red if no match
    }));

    setIsOpen(false);
  };

  return (
    <>
      {/* Modal component to display the country name */}
      <Modal
        isOpen={isOpen}
        data={selectedCountry}
        onClose={(isOpen) => {
          setIsOpen(false);
        }}
      >
        <div>
          <h3>Name the Country!</h3>
          <p>
            Enter a country and discover its rights. Let’s see what you know!
          </p>
          <form onSubmit={handleSubmit} className="form-container">
            <input
              type="text"
              placeholder="Enter your answer"
              value={inputCountry}
              onChange={(e) => setInputCountry(e.target.value)}
            />
            <button className="form-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Modal>

      <header className="top-section">
        <div className="left-aligned">WORLD MAP GAME</div>
        <div className="center-aligned">Score: {score}</div>

        <div className="right-aligned">{resulttext}</div>
      </header>

      <main className="map-container">
        <div><h4 className="center-aligned">World Explorer: Name & Score Your Knowledge!</h4></div>
        <ComposableMap style={{ width: "100%", height: "auto" }}>
          <Geographies geography={geoData}>
            {({ geographies, error }) => {
              if (error) {
                console.error("Error loading GeoJSON:", error);
                return <div>Error loading map data.</div>;
              }

              return geographies.map((geo) => {
                const countryName = geo.properties.name;
                const countryColor = clickedCountries[countryName] || "#D6D6DA"; // Default color or clicked color
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: countryColor,
                        outline: "none",
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                    onClick={() => handleCountryClick(geo)}
                  />
                );
              });
            }}
          </Geographies>
        </ComposableMap>
      </main>
    </>
  );
};

export default WorldMap;
