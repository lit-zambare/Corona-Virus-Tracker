import axios from 'axios';

const url = 'https://api.thevirustracker.com/free-api?';

export const fetchData = async(country) =>
{	try
	{	
		if(country === "FETCH-ALL"){
			const { data : {countryitems} } = await axios.get(`${url}countryTotals=ALL`);
			const arr= Object.values(countryitems[0]);
			arr.pop();	//to remove unwanted last ok element from fetehed api ok
			return(arr);
		}
		else if(country)
		{
			const { data : {countrydata} } = await axios.get(`${url}countryTotal=${country}`);
			return(countrydata[0]);
		}
		else{
			const { data : { results } } = await axios.get(`${url}global=stats`);
			return(results[0]);
		}
	}
	catch(error)
	{
		console.log(error);
	}
}


export const fetchTimeline = async (country) =>
{
	try{	
		const {data: { timelineitems }} = await axios.get(`${url}countryTimeline=${country}`);
		return(timelineitems);
	}
	catch(error)
	{
		console.log("Error in fetching timeline : " , error);
	}
}


export const fetchCountries = async () => {
  try {
    const { data: { countryitems } } = await axios.get(`${url}countryTotals=ALL`);
	const data = Object.values(countryitems[0]);
    return(data.map(country => {
    	return {
	    	code : country.code,
	    	country : country.title
    	}
	}));
  } catch (error) {
    return error;
  }
};

export const fetchDataIndia = async() =>
{
	try
	{	
		const {data:{ cases_time_series,statewise }} = await axios.get(`https://api.covid19india.org/data.json`);
		const {data} = await axios.get(`https://api.covid19india.org/v2/state_district_wise.json`);
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

export const fetchInidaTimeline = async() =>
{
	try
	{	
		const {data:{states_daily}} = await axios.get(`https://api.covid19india.org/states_daily.json`);
		return(states_daily);
	}
	catch(error)
	{
		console.log(error);
	}
}