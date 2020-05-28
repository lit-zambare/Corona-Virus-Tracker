import React, { useState, useEffect } from 'react';
import {fetchTimeline} from '../../../api';
import { Line, Bar,Doughnut,HorizontalBar } from 'react-chartjs-2';
import styles from './charts.module.css';
import {fetchInidaTimeline} from '../../../api';


// api from : https://api.covid19india.org/states_daily.json

const Charts = ({state,TimeSeries}) => {
  const [timeline, setTimeline] = useState([]);
  const [Confirmed, setConfirmed] = useState([]);
  const [Recovered, setRecovered] = useState([]);
  const [Deceased, setDeceased] = useState([]);
  let prev=0,cur=0;

  useEffect(() => {
    const fetchMyAPI = async () => {
      const mytimeline = await fetchInidaTimeline();
      if(mytimeline)
      {
        setTimeline(mytimeline);
        if(timeline && state.state!=="Total")
        {   
            let a=[],b=[],c=[];
            mytimeline.map((item) => {
              if(item.status==="Confirmed")
                  a.push(item);
              else if(item.status==="Recovered")
                  b.push(item);
              else
                  c.push(item);
            });
            if(a) setConfirmed(a);
            if(c) setDeceased(c);
            if(b) setRecovered(b);
        }
      }
    };

    fetchMyAPI();
  }, []);


    const lineChart = (
    state.state ? (
      <Line
    height={window.screen.width>700 ? "200px" : "250px"}
    options={{
      responsive:true,
      title: { display: true, text: `Overall Statistics for ${state.state}`},
      layout:{ margin : {bottom:50}},
      maintainAspectRatio:true,
    }}
		data={{
          labels: Confirmed.map((item) => item.date),
          datasets: [{
            data: Confirmed.map((item,index) => {
              if(index === 0) prev=0;
              cur = Number(item[state.statecode.toLowerCase()]);
              prev = prev + cur;
              return(prev);
            }),
            label: 'Total',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: Recovered.map((item,index) => {
              if(index === 0) prev=0;
              cur = Number(item[state.statecode.toLowerCase()]);
              prev = prev + cur;
              return(prev);
            }),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },{
            data: Deceased.map((item,index) => {
              if(index === 0) prev=0;
              cur = Number(item[state.statecode.toLowerCase()]);
              prev += cur;
              return(prev);
            }),
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

  const barChart1 = (
    state.state ? (
      <Bar
      height={window.screen.width>700 ? "150px" : "250px"}
        data={{
          labels: Confirmed.map((item) => item.date),
          datasets: [
            {
              label: 'Cases',
              backgroundColor: 'rgba(0, 0, 255, 0.5)',
              data: Confirmed.map((item) => Number(item[state.statecode.toLowerCase()])),
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Daily Confirmed Cases in ${state.state}`},
          responsive:true,
        }}
      />
    ) : null
  );

  const barChart2 = (
    state.state ? (
      <Bar
      height={window.screen.width>700 ? "150px" : "250px"}
        data={{
          labels: Recovered.map((item) => item.date),
          datasets: [
            {
              label: 'Cases',
              backgroundColor: 'rgb(0, 255, 0)',
              data: Recovered.map((item) => Number(item[state.statecode.toLowerCase()])),
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Daily Recovered Cases in ${state.state}`},
          responsive:true,
        }}
      />
    ) : null
  );

  const barChart3 = (
    state.state ? (
      <Bar
      height={window.screen.width>700 ? "150px" : "250px"}
        data={{
          labels: Deceased.map((item) => item.date),
          datasets: [
            {
              label: 'Cases',
              backgroundColor: 'rgb(255, 0, 0)',
              data: Deceased.map((item) => Number(item[state.statecode.toLowerCase()])),
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Daily Deceased Cases in ${state.state}`},
          responsive:true,
        }}
      />
    ) : null
  );


  const lineChart2 = (
    state.state ? (
      <Line
      height={window.screen.width>700 ? "200px" : "250px"}
    options={{
      responsive:true,
      title: { display: true, text: `Overall Statistics for India`},
      layout:{ margin : {bottom:50}},
    }}
		data={{
          labels: TimeSeries.map((item) => item.date.substr(0,6)),
          datasets: [{
            data: TimeSeries.map((item,index) => Number(item.totalconfirmed)),
            label: 'Total',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: TimeSeries.map((item,index) => Number(item.totaldeceased)),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },{
            data: TimeSeries.map((item,index) => Number(item.totalrecovered)),
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


  const doughnut = (
    state.state ? (
      <HorizontalBar 
          options={{
            responsive:true,
          }}
          data = {{
            labels: [
              'Total',
              'Active',
              'Recovered',
              'Deaths'
            ],
            datasets: [{
              data: [state.confirmed,state.active,state.recovered,state.deaths],
              backgroundColor: [
                'rgba(255,0,0,0.5)',
                'rgba(0,0,255,0.5)',
                'rgba(0,255,0,0.5)',
                'rgb(255,0,0)'
              ],
              hoverBackgroundColor: [
                'rgba(255,0,0,0.3)',
                'rgba(0,0,255,0.3)',
                'rgba(0,255,0,0.3)',
                'rgba(255,0,0,0.75)'
              ]
            }]
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: ""},
            responsive:true,
          }}
      />
    ) : null
  );

  if(state.state === "Total")
          return(
            <div className={styles.container}>
            <div className={styles.left_charts_div}>
                {lineChart2}
                {doughnut}
            </div>
            </div>
          );
  else
      return(
        <div className={styles.container}>
          <div className={styles.left_charts_div}>
            {lineChart}
            {barChart1}
            {barChart2}
            {barChart3}
        </div>
        </div>
      )      

}
export default Charts;
