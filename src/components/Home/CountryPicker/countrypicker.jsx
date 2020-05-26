import React, { useState, useEffect } from 'react';
import styles from './countrypicker.module.css';
import { fetchCountries } from '../../../api';
import { NativeSelect, FormControl } from '@material-ui/core';

const Countrypicker = ({ handleCountryChange }) => {
	
	const [countries, setCountries] = useState([]);
	useEffect(() => {
		const fetchAPI = async () =>{
			setCountries(await fetchCountries());
		};
		fetchAPI();

	},[]);

  return(
    <div>
      <FormControl className={styles.formControl}>
      <label htmlFor='block'><strong>Select Country : </strong>
      <span>
      <NativeSelect className={styles.select} id='block' defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
         <option value="">Global</option>
        {countries.map((data, i) => <option key={i} value={data.code}>{data.country}</option>)}
      </NativeSelect></span>
      </label> 
    </FormControl>
    </div>
  );
};

export default Countrypicker;
