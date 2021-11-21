import React from 'react';
import { TypeWriter } from '../index.js';
import { Cards, CountryPicker, Chart ,VectorMap,MyTable } from './index.js';
import image from '../../images/image.png';
import styles from './Home.module.css';
import { fetchData } from '../../api';

class Home extends React.Component {
  state = {
      data: {},
      GlobalData: {},
      country : "",
      AllCountriesData : []
  }
  
 async componentDidMount() {
    const { Global,Countries }  = await fetchData();
    this.setState({ data : Global,
                    GlobalData : Global,
                    AllCountriesData: Countries });
  }

  handleCountryChange = async (country) => {
    //const data = await fetchData(country);
    this.setState({ country });
    if(country === "")
    {
      this.setState({ data: this.state.GlobalData });
    }
    else
    { 
        const result = this.state.AllCountriesData.find( item => item.Slug === country )
        this.setState({ data : result });
    }
  }
  
  render()
  { 
    const { data, country ,AllCountriesData} = this.state;
    return(
      <div>
          <div className={styles.container}>
            <img className={styles.image} src={image} alt="COVID-19" />
            <TypeWriter />
            <Cards data={data} total={AllCountriesData.length}/>
            <CountryPicker handleCountryChange={this.handleCountryChange} AllCountriesData={AllCountriesData}/>
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