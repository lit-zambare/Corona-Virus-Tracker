import React, { useState, useEffect } from 'react';
import styles from './countrypicker.module.css';
import { fetchCountries } from '../../../api';
import { NativeSelect, FormControl } from '@material-ui/core';

const Countrypicker = ({ handleCountryChange,AllCountriesData }) => {
	
  const [countries, setCountries] = useState([]);
	useEffect(() => {
    const result = AllCountriesData.map((item,i) => { return({ Country: item.Country, Slug:item.Slug}) });
    setCountries(result);
  },[AllCountriesData]);



  if(!countries[0])
  { 
    return(<h5>Fetching Data,Please Wait ...</h5>);
  }

  return(
    <div>
      <FormControl className={styles.formControl}>
      <label htmlFor='block'><strong>Select Country : </strong>
      <span>
      <NativeSelect className={styles.select} id='block' defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
         <option value="">Global</option>
        {countries.map((data, i) => <option key={i} value={data.Slug}>{data.Country}</option>)}
      </NativeSelect></span>
      </label> 
    </FormControl>
    </div>
  );
};

export default Countrypicker;
