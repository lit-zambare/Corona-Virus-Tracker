import React, { useState, useEffect } from 'react';
import {fetchTimeline} from '../../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './charts.module.css';

const Charts = ({details, country}) => {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const fetchMyAPI = async (country) => {
      const mytimeline = await fetchTimeline(country);
      setTimeline(mytimeline);
    };

    fetchMyAPI(country);
  }, [country]);

	// const arr = Object.values(timeline);
    const lineChart = (
    country ? (
      <Line
    options={{
      responsive:true,
    }}
		data={{
          labels: timeline.map((item) => item.Date.substr(0,10)),
          datasets: [{
            data: timeline.map((data) => data.Confirmed),
            label: 'Total',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: timeline.map((data) => data.Deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },{
            data: timeline.map((data) => data.Recovered),
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          }
          ],
        }}
      />
    ) : null
  );

  const barChart = (
    country ? (
      <Bar
        data={{
          labels: ["Total","Active","Recoverd","Deaths"],
          datasets: [
            {
              label: 'Cases',
              backgroundColor: ['rgba(0, 0, 255, 0.5)','rgba(255, 0, 255, 0.5)','rgba(0, 255, 0, 0.5)','rgba(255, 0, 0, 0.5)'],
              data: [details.TotalConfirmed,details.TotalConfirmed-(details.TotalRecovered+  details.TotalDeaths),details.TotalRecovered,details.TotalDeaths],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
          responsive:true,
        }}
      />
    ) : null
  );
	

  return(
    <div className={styles.container}>
      <div className={styles.left_div}>
       {lineChart}
       </div>
       <div className={styles.right_div}>
       {barChart}
       </div>
    </div>
  )
}
export default Charts;
