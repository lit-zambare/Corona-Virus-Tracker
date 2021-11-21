import React, { useState, useEffect } from 'react';
import styles from './GlobalMap.module.css';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as countries1 from './countries.json';
import { makeStyles } from '@material-ui/core/styles';
import { fetchForMap } from '../../api';
import Typist from "react-typist";

const GlobalMap = (props) => {

  // const classes = useStyles();
	const countries = countries1.default;
	const [viewport, setViewport] = useState({
    latitude: 20.593684,
    longitude: 78.96288,
    zoom:2,
    height: '100%',
    width: '100%',
  });
  const [selectedCountry, setselectedCountry] = useState({});
  const [AllCountriesData,setAllCountriesData] = useState([]);
  const [count, setCount] = useState(1);


  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setselectedCountry({});
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(()=>{
    const fetchAPI = async() => {
      setAllCountriesData(await fetchForMap());
    }
    fetchAPI();
  },[]);
	
  return (
   
    <div className={styles.root}>

      {count ? (
        <Typist className={styles.typist} avgTypingDelay={50} onTypingDone={() => setCount(0)}>
          {window.screen.width > 768 ? <span>You can Zoom </span> : <span>Use two fingers to Zoom </span>}
          <Typist.Backspace count={5} delay={800} />
          <span>Scroll </span>
          <Typist.Backspace count={7} delay={800} />
          <span>Pan </span>
          <Typist.Backspace count={23} delay={800} />
          <span>Click on any flag for more details</span>
          <Typist.Delay ms={800} />
        </Typist>
      ) : (
        ""
      )}

      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoidmVyeXJhbmRvbXVzZXIiLCJhIjoiY2thMHZoOTMzMDV0YjNlbjI2cDF4MnMydyJ9.UsATQq7TWrWvyYE2LTQ3JA"
        mapStyle="mapbox://styles/veryrandomuser/cka0vwjck333l1ipls3958yg4"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {AllCountriesData !== undefined ? AllCountriesData.map(country => (
          Object.keys(countries).includes(country.CountryCode) ? <Marker
            key={country.CountryCode}
            latitude={countries[country.CountryCode].latitude}
            longitude={countries[country.CountryCode].longitude}
          >
            <button
              className={styles.marker_btn}
              onClick={e => {
                e.preventDefault();
                selectedCountry !== country ? setselectedCountry(country) : setselectedCountry({});
              }}
            >
              <img src={require(`./Flags/${country.CountryCode.toLowerCase()}.png`)} alt={`${country.Country}`} />
            </button>
          </Marker> : null
        )) : null} 

        {countries[selectedCountry.CountryCode] ? (
          <Popup
            latitude={countries[selectedCountry.CountryCode].latitude}
            longitude={countries[selectedCountry.CountryCode].longitude}
            onClose={() => {
              setselectedCountry({});
            }}
          >
            <div>
              <p className={styles.ptag}>{selectedCountry.Country}</p>
              <p className={styles.ptag}>Total : {selectedCountry.TotalConfirmed.toLocaleString()}</p>
              <p className={styles.ptag}>Active : {(selectedCountry.TotalConfirmed-(selectedCountry.TotalRecovered+selectedCountry.TotalDeaths)).toLocaleString() }</p>
              <p className={styles.ptag}>Recoverd : {selectedCountry.TotalRecovered.toLocaleString()}</p>
  			      <p className={styles.ptag}>Deaths : {selectedCountry.TotalDeaths.toLocaleString()}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}


export default GlobalMap;