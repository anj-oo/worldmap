import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const WorldMap = () => {
  const geoPath = "/geo.json";

  return (
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
        onClick={() => alert(`Clicked on ${geo.properties.name}`)}
      />
    ));
  }}
</Geographies>

    </ComposableMap>
  );
};

export default WorldMap;
