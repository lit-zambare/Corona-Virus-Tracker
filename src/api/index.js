import axios from 'axios';

const url = 'https://api.covid19api.com';

export const fetchData = async(country) =>
{	try
	{	
		const { data  } = await axios.get(`${url}/summary`);
		const { Global, Countries } = data; 
		return( { Global,Countries})
		// if(country === "FETCH-ALL"){
		// 	const { data : {countryitems} } = await axios.get(`${url}/summary`);
		// 	const arr= Object.values(countryitems[0]);
		// 	arr.pop();	//to remove unwanted last ok element from fetehed api ok
		// 	return(arr);
		// }
		// else if(country)
		// {
		// 	const { data : {countrydata} } = await axios.get(`${url}countryTotal=${country}`);
		// 	return(countrydata[0]);
		// }
		// else{
		// 	const { data : { results } } = await axios.get(`${url}global=stats`);
		// 	if(typeof results === "undefined" || typeof results[0] === "undefined")
		// 	{
		// 		return({total_cases:-1});
		// 	}
		// 	return(results[0]);
		// }
	}
	catch(error)
	{
		console.log(error);
		return {Global:{},Countries:[]};
	}
}


export const fetchTimeline = async (country) =>
{
	try{	
		const {data} = await axios.get(`${url}/country/${country}`);
		return(data);
	}
	catch(error)
	{
		  console.log("Error in fetching timeline : " , error);
		  // var today = new Date();
		  // var date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  		//   var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  		//   const {data} = await axios.get(`${url}/country/${country}?from=${lastWeek.toISOString()}&to=${date.toISOString()}`);
  		//   console.log(data);
  		  return [];
	}
}


export const fetchForMap = async () => {
  try {
        const { data : { Countries } } = await axios.get(`${url}/summary`);
    	return(Countries);
	
  } catch (error) {
    return [];
  }
};

export const fetchDataIndia = async() =>
{
	try
	{	
		const {data:{ cases_time_series,statewise }} = await axios.get(`https://data.covid19india.org/data.json`);
		const {data} = await axios.get(`https://data.covid19india.org/v2/state_district_wise.json`);
		return({
			StatesData : statewise.splice(1),
			IndiaData : statewise[0],
			DistrictData : data,
			TimeSeries : cases_time_series
		});
	}
	catch(error)
	{
		console.log(error);
	}
}

// export const fetchDataIndia = async() =>
// {
// 	try
// 	{	
// 		console.log("======================================")
// 		const {data} = await axios.get(`https://data.covid19india.org/v4/min/data.min.json`);

// 		console.log(data)
// 		var indiaData = data['TT']
// 		delete data['TT']

// 		indiaData = {
// 			"active": (indiaData['total']['confirmed'] ? indiaData['total']['confirmed'] : 0) - ((indiaData['total']['deceased'] ? indiaData['total']['deceased'] : 0) + (indiaData['total']['recovered'] ? indiaData['total']['recovered'] : 0)),
// 			"confirmed": indiaData['total']['confirmed'] ? indiaData['total']['confirmed'] : 0,
// 			"deaths": indiaData['total']['deceased'] ? indiaData['total']['deceased'] : 0,
// 			"deltaconfirmed": indiaData['delta']['confirmed'] ? indiaData['delta']['confirmed'] : 0,
// 			"deltadeaths": indiaData['delta']['deceased'] ? indiaData['delta']['deceased'] : 0,
// 			"deltarecovered": indiaData['delta']['recovered'] ? indiaData['delta']['recovered'] : 0,
// 			"lastupdatedtime": indiaData['meta']['date'],
// 			"recovered": indiaData['total']['recovered'] ? indiaData['total']['recovered'] : 0,
// 			"state": "Total",
// 			"statecode": "TT",
// 		}
// 		console.log(indiaData)

// 		var statesData = Object.keys(data).map(function(key) {
// 			return {
// 				"active": (data[key]['total']['confirmed'] ? data[key]['total']['confirmed'] : 0) - ((data[key]['total']['deceased'] ? data[key]['total']['deceased'] : 0) + (data[key]['total']['recovered'] ? data[key]['total']['recovered'] : 0)),
// 				"confirmed": data[key]['total']['confirmed'] ? data[key]['total']['confirmed'] : 0,
// 				"deaths": data[key]['total']['deceased'] ? data[key]['total']['deceased'] : 0,
// 				"deltaconfirmed": data[key]['delta']['confirmed'] ? data[key]['delta']['confirmed'] : 0,
// 				"deltadeaths": data[key]['delta']['deceased'] ? data[key]['delta']['deceased'] : 0,
// 				"deltarecovered": data[key]['delta']['recovered'] ? data[key]['delta']['recovered'] : 0,
// 				"lastupdatedtime": data[key]['meta']['date'],
// 				"recovered": data[key]['total']['recovered'] ? data[key]['total']['recovered'] : 0,
// 				"state": stateCodeMapping[key],
// 				"statecode": key,
// 			}
// 		})

// 		console.log(statesData)

// 		var districtData = Object.keys(data).map(function(key) {
// 			return {  "state": stateCodeMapping[key],
// 						"statecode": key,
// 						"districtData":  Object.keys(data[key]['districts']).map(function(key2) {
// 							data[key]['districts']['state'] = key2
// 							return data[key]['districts']['state']
// 						})
// 					}
// 		})
		
// 		console.log(districtData)

// 		// Fetch timeline
// 		const {data:{TT:{dates}}} = await axios.get(`https://data.covid19india.org/v4/min/timeseries.min.json`);
// 		const timeSeriesData = dates
// 		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// 		console.log(timeSeriesData)

// 		var timeseries = Object.keys(timeSeriesData).map(function(key) {
// 			return {
// 				"dailyconfirmed": timeSeriesData[key]['delta']['confirmed'] ? timeSeriesData[key]['delta']['confirmed'] : 0,
// 				"dailydeceased": timeSeriesData[key]['delta']['deceased'] ? timeSeriesData[key]['delta']['deceased'] : 0,
// 				"dailyrecovered": timeSeriesData[key]['delta']['recovered'] ? timeSeriesData[key]['delta']['recovered'] : 0,
// 				"date": key,
// 				"totalconfirmed": timeSeriesData[key]['total']['confirmed'] ? timeSeriesData[key]['total']['confirmed'] : 0,
// 				"totaldeceased": timeSeriesData[key]['total']['deceased'] ? timeSeriesData[key]['total']['deceased'] : 0,
// 				"totalrecovered": timeSeriesData[key]['total']['recovered'] ? timeSeriesData[key]['total']['recovered'] : 0
// 			}
// 		})
// 		console.log(timeseries)

// 		return({
// 			StatesData : statesData,
// 			IndiaData : indiaData,
// 			DistrictData : districtData,
// 			TimeSeries : timeseries
// 		});
// 	}
// 	catch(error)
// 	{
// 		console.log(error);
// 	}
// }

export const fetchInidaTimeline = async() =>
{
	try
	{	
		const {data:{states_daily}} = await axios.get(`https://data.covid19india.org/states_daily.json`);
		return(states_daily);
	}
	catch(error)
	{
		console.log(error);
	}
}