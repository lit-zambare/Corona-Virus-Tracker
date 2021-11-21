import React, { useEffect,memo, useState } from 'react';
import styles from './MapChild.module.css';
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { scaleLinear } from "d3-scale"


const SupportingFunction = (state,StatesData) =>
{

  const APIdata = React.useMemo(() =>
  {   
      let Data={};
      if(state.state)
      {
         

          Data =  Object.assign({}, ...StatesData.map(item => ({ [item.statecode]: { 
              "name" : item.state,
              "total" : item.confirmed,
              "active" : item.active,
              "recovered" : item.recovered,
              "new_total" : item.deltaconfirmed,
              "new_deaths" : item.deltadeaths,
              "new_recovered" : item.deltarecovered,
              "deaths" : item.deaths }})));
          
      }
      return(Data);
      
  },[StatesData]);

  return (APIdata);
}

const MapChild =  ({ setTooltipContent , state,StatesData }) =>
{	
  
  const [APIdata,setAPIdata] = useState({});
  const [topojson,setTopojson] = useState(require("./india.json"));
  const [projection,setProjection] = useState({ dimension : {height : 400 , width:500},
                                                config : {scale : 700, center : [83,22]} });
  const Data = SupportingFunction(state,StatesData);

  useEffect(() => {
    if(Data)
    {
      setAPIdata(Data);
    }
  },[state,Data]);


  const getcolor = scaleLinear()
  .domain([0, 3500000]) // Max is based on China
  .range(["#ffe6e6","#ff1a1a" ])

	return (
    <div className={styles.background_map}>
      <ComposableMap width={projection.dimension.width} height={projection.dimension.height}            
                      projection="geoMercator" className={styles.map} data-tip=""
                      projectionConfig={ projection.config}>
          <Geographies
           geography={topojson}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}

                  onMouseEnter={() => {
                    const code = geo["id"];
                    if(APIdata[code])
                    {
                      const { name,total,active,recovered,deaths } = APIdata[code];
                      setTooltipContent(<div>
                                          <p className={styles.ptag}>{name}</p>
                                          <p className={styles.ptag}>total : {parseInt(total).toLocaleString()} </p>
                                          <p className={styles.ptag}>active : {parseInt(active).toLocaleString()} </p>
                                          <p className={styles.ptag}>recovered : {parseInt(recovered).toLocaleString()} </p>
                                          <p className={styles.ptag}>deaths : {parseInt(deaths).toLocaleString()} </p> 
                                        </div>)
                    }
                    else
                    {
                      setTooltipContent(<p>{geo.properties.name}</p>);
                    }
                  }}

                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      // eslint-disable-next-line no-restricted-globals
                      fill: `${APIdata[geo["id"]] ? getcolor(APIdata[geo["id"]].total) : "black"}`,
                      stroke: "#1f2125",
                      'strokeWidth': "0.4px",
                      outline: 'none',
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