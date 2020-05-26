import React from 'react';
import { TypeWriter } from '../index.js';
import { Cards, CountryPicker, Chart ,VectorMap,MyTable } from './index.js';
import image from '../../images/image.png';
import styles from './Home.module.css';
import { fetchData } from '../../api';

class Home extends React.Component {
  state = {
      data: {},
      country : "",
      AllCountriesData : []
  }
  
 async componentDidMount() {
    const data  = await fetchData();
    this.setState({ data });
    const AllCountriesData = await fetchData("FETCH-ALL");
    this.setState({ AllCountriesData });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({ data, country: country });
  }
  
  render()
  { 
    const { data, country ,AllCountriesData} = this.state;
    return(
      <div>
          <div className={styles.container}>
            <img className={styles.image} src={image} alt="COVID-19" />
            <TypeWriter />
            <Cards data={data}/>
            <CountryPicker handleCountryChange={this.handleCountryChange}/>
            {country ? <Chart details={data} country={country}/> : 
                        <VectorMap AllCountriesData={AllCountriesData}/> 
                        }
            <MyTable AllCountriesData={AllCountriesData}/>
          </div>
        </div>
      )
  }
}

export default Home;