import React from 'react';
import styles from './countrypicker.module.css';
import { NativeSelect, FormControl } from '@material-ui/core';

const Countrypicker = ({ IndiaData,StatesData,handleStateChange }) => {
	
  return(
    <div>
      <FormControl className={styles.formControl}>
      <label htmlFor='block'><strong>Select State : </strong>
      <span>
      <NativeSelect className={styles.select} id='block' defaultValue="" onChange={(e) => handleStateChange(e.target.value)}>
         <option value={JSON.stringify(IndiaData)}>National</option>
        {StatesData.map((data, i) => <option key={i} value={JSON.stringify(data)}>{data.state}</option>)}
      </NativeSelect></span>
      </label> 
    </FormControl>
    </div>
  );
};

export default Countrypicker;
