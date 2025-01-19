import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Modal from "./Modal";

const WorldMap = () => {
  const geoPath = "/geo.json";
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputCountry, setInputCountry] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [isMatch, setIsMatch] = React.useState(false);

  const handleInputCountry = (e) => {
    setInputCountry(e.target.value);
  };

  const handleCountryClick = (geo) => {
    setIsOpen(true);
    const countryStringify = JSON.stringify(geo);
    const countryClicked = JSON.parse(countryStringify).properties.name;
    console.log(countryClicked);
    setSelectedCountry(countryClicked);
  };

  const submitAnswer = () => {
    setIsMatch(selectedCountry.toLowerCase === inputCountry.toLowerCase);
    setTimeout(() => {
      resetAllState();
    }, 2000);
  };

  const resetAllState = () => {
    setIsOpen(false);
    setInputCountry("");
    setSelectedCountry("");
    setIsMatch(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        data={selectedCountry}
        onClose={(isOpen) => {
          setIsOpen(false);
          setIsMatch(false);
        }}
      >
        {isMatch ? (
          <p>Right Answer!!!</p>
        ) : (
          <>
            <h1>Name the Country!</h1>
            <p>
              Enter a country and discover its rights. Let’s see what you know!
            </p>
            <input
              type="text"
              placeholder="Type something"
              value={inputCountry}
              onChange={handleInputCountry}
            />
            <button onClick={submitAnswer}>Submit</button>
          </>
        )}
      </Modal>

      <ComposableMap style={{ width: "100%", height: "auto" }}>
        <Geographies geography={geoPath}>
          {({ geographies, error }) => {
            if (error) {
              console.error("Error loading GeoJSON:", error);
              return <div>Error loading map data.</div>;
            }
            return geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#D6D6DA", outline: "none" },
                  hover: { fill: "#F53", outline: "none" },
                  pressed: { fill: "#E42", outline: "none" },
                }}
                onClick={() => handleCountryClick(geo)}
              />
            ));
          }}
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default WorldMap;
