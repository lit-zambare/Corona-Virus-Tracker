import React, { memo } from 'react';
import styles from './MapChild.module.css';
import {
  ComposableMap,
  Geographies,
  ZoomableGroup,
  Geography
} from "react-simple-maps";


let arg;
const geoUrl = 
"https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json";
const MapChild = ({ setTooltipContent , AllCountriesData }) =>
{	
  const APIdata = Object.assign({}, ...AllCountriesData.map(item => ({ [item.CountryCode]: { 
    "name" : item.Country,
    "total" : item.TotalConfirmed,
    "active" : item.TotalConfirmed-(item.TotalRecovered+item.TotalDeaths),
    "recovered" : item.TotalRecovered,
    "deaths" : item.TotalDeaths }})));

  function getcolor(total)
  {
    if(total > 30000000)
      return ("#FF0000");
    else if(total > 10000000)
      return("#FF1010");
    else if(total > 7000000)
      return("#FF2020");
    else if(total > 3000000)
     return("#FF3030)");
    else if(total > 1000000)
      return("#FF4040");
    else if(total > 500000)
      return("#FF5050");
    else if(total > 300000)
      return( "#FF6A6A");
    else if(total > 200000)
      return ("#FF8888");
    else if(total > 100000)
     return( "#FF9090");
    else if(total > 50000)
      return("#FFB1B1");
    else if(total > 10000)
      return("#FFC1C1");
    else if(total > 5000)
      return("#FFCDCD");
    else if(total > 1000)
      return("#FFDADA");
    else
        return ("white");
  }
	
	return (
    <div style={{height:`${window.screen.width/1.5}px`}} className={styles.background_map}>
      <ComposableMap width={700} className={styles.map} data-tip="" projection="geoMercator" projectionConfig={{scale: 100}}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const code = geo.properties["Alpha-2"];
                    if(APIdata[code])
                    {
                      const { name,total,active,recovered,deaths } = APIdata[code];
                      arg =active;
                      setTooltipContent(<div>
                                          <p className={styles.ptag}>{name}</p>
                                          <p className={styles.ptag}>total : {total.toLocaleString()} </p>
                                          <p className={styles.ptag}>active : {active.toLocaleString()} </p>
                                          <p className={styles.ptag}>recovered : {recovered.toLocaleString()} </p>
                                          <p className={styles.ptag}>deaths : {deaths.toLocaleString()} </p> 
                                        </div>)
                    }
                    else
                    {
                      setTooltipContent(<div>
                                          <p>{geo.properties.name} (Corona-Free)</p>
                                        </div>);
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      // eslint-disable-next-line no-restricted-globals
                      fill: APIdata[geo.properties["Alpha-2"]] ? getcolor(APIdata[geo.properties["Alpha-2"]].total) : "white",
                      stroke: "#1f2125",
                      'strokeWidth': "0.3px",
                      outline:"none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
      </ComposableMap>
    </div>
  );
}

export default memo(MapChild);