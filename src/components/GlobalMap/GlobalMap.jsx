import React, { useState, useEffect } from 'react';
import styles from './GlobalMap.module.css';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as countries1 from './countries.json';
import { makeStyles } from '@material-ui/core/styles';
import { fetchData } from '../../api';
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
      setAllCountriesData(await fetchData("FETCH-ALL"));
    }
    fetchAPI();
  },[]);
	
  return (
   
    <div className={styles.root}>

      {count ? (
        <Typist className={styles.typist} avgTypingDelay={50} onTypingDone={() => setCount(0)}>
          <span>You can Zoom </span>
          <Typist.Backspace count={5} delay={800} />
          <span>Pan </span>
          <Typist.Backspace count={4} delay={800} />
          <span>Scroll </span>
          <Typist.Backspace count={20} delay={800} />
          <span>Click on any flag for more details</span>
          <Typist.Backspace count={34} delay={500} />
          <span></span>
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
        {AllCountriesData ? AllCountriesData.map(country => (
          Object.keys(countries).includes(country.code) ? <Marker
            key={country.ourid}
            latitude={countries[country.code].latitude}
            longitude={countries[country.code].longitude}
          >
            <button
              className={styles.marker_btn}
              onClick={e => {
                e.preventDefault();
                selectedCountry !== country ? setselectedCountry(country) : setselectedCountry({});
              }}
            >
              <img src={require(`./Flags/${country.code.toLowerCase()}.png`)} alt={`${country.title}`} />
            </button>
          </Marker> : null
        )) : null} 

        {countries[selectedCountry.code] ? (
          <Popup
            latitude={countries[selectedCountry.code].latitude}
            longitude={countries[selectedCountry.code].longitude}
            onClose={() => {
              setselectedCountry({});
            }}
          >
            <div>
              <p className={styles.ptag}>{selectedCountry.title}</p>
              <p className={styles.ptag}>Total : {selectedCountry.total_cases.toLocaleString()}</p>
              <p className={styles.ptag}>Active : {selectedCountry.total_active_cases.toLocaleString()}</p>
              <p className={styles.ptag}>Recoverd : {selectedCountry.total_recovered.toLocaleString()}</p>
  			      <p className={styles.ptag}>Deaths : {selectedCountry.total_deaths.toLocaleString()}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}


export default GlobalMap;