import React, {useState,useEffect} from 'react';
import image from '../../images/image.png';
import styles from './India.module.css';
import { fetchDataIndia } from '../../api';
import {Cards,CountryPicker,VectorMap,Chart,MyTable,TypeWriter} from './index';

const India = () => {

    const [IndiaData,setIndiaData] = useState({});
    const [StatesData, setStatesData] = useState([]);
    const [DistrictData, setDistrictData] = useState([]);
    const [TimeSeries,setTimeSeries] = useState([]);
    const [state, setState] = useState({});

    useEffect(() => {
        const fetchAPI = async() =>
        {        
            const {StatesData,IndiaData,DistrictData,TimeSeries} = await fetchDataIndia();
            setIndiaData(IndiaData);
            setState(IndiaData);
            setStatesData(StatesData);
            setDistrictData(DistrictData);
            setTimeSeries(TimeSeries);
        }   
        fetchAPI();
    },[]);



    const handleStateChange = (data) => {
        setState(JSON.parse(data));
    }


    return(
          <div className={styles.container}>
            <img className={styles.image} src={image} alt="COVID-19" />
            <TypeWriter />
            <Cards data={state}/>
            <CountryPicker IndiaData={IndiaData} StatesData={StatesData} handleStateChange={handleStateChange}/>
            <div className={styles.sections}>
                <section className={styles.section_left}>
                    {state.state==="Total" ? <><VectorMap state={state} StatesData={StatesData} DistrictData={DistrictData}/>
                                              <Chart TimeSeries={TimeSeries} state={state}/></>
                    : <Chart TimeSeries={TimeSeries} state={state}/> }
                </section>
                <section className={styles.section_right}>
                    <MyTable state={state} StatesData={StatesData} DistrictData={DistrictData}/>
                </section>
            </div>
          </div>
    );
}

export default India;

//APIs : https://api.covid19india.org/data.json || https://api.covid19india.org/v2/state_district_wise.json