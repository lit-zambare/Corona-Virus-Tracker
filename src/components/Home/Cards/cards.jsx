import React from 'react';
import { Card, Paper, Typography, Grid,CardContent,CardActionArea } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import styles from './cards.module.css';
import { useTheme,makeStyles } from "@material-ui/styles";




const Cards = ({ data }) => {

	console.log("data is : ",data);

	if(data.total_cases === -1)
	{	
		return(<div style={{textAlign:"center",margin:25}}>
			<Typography color="secondary">Alas! Looks like the server of api is down...</Typography>
			<Typography color="error">Can't fetch global data. This will get fixed ASAP.</Typography>
			<Typography color="error">Please come back after minutes and check again...</Typography>
			<Typography color="primary"><strong>Sorry for the inconvenience</strong></Typography>
		</div>);
	}

	if(Object.keys(data).length === 0 && data.constructor === Object)
	{
		return(<h3>Loading...</h3>);
	}

  return(
    <div className={styles.container}>
      <Grid item xs={12} sm={12}>
        <Grid container justify="center" alignItems="flex-end" alignContent="center" spacing={2}>
			
            <Grid item>
				<Paper elevation={3}  className={cx(styles.card,styles.total)}>
					<Typography  noWrap={true}  color="textSecondary">Total Cases</Typography>
					<Typography variant={window.screen.width > 768 ? "h6" : "h6"}>
					<strong><CountUp start={0} end={data.total_cases} duration={2.75} separator="," /></strong>		
					</Typography >
					<Typography  noWrap={true} variant="caption">
					+<CountUp start={0} end={data.total_new_cases_today} duration={2.75} separator="," /> new cases
					</Typography>
				</Paper>
            </Grid>

			<Grid item>
				<Paper elevation={3} className={cx(styles.card,styles.active)}>
					<Typography color="textSecondary">Active</Typography>
					<Typography variant="h6" component="h2">
					<strong><CountUp start={0} end={data.total_active_cases} duration={2.75} separator="," /></strong>
					</Typography>
					<Typography  noWrap={true}  variant="caption">
					<CountUp start={0} end={data.total_unresolved} duration={2.75} separator="," /> unresolved
					</Typography>
      			</Paper>
            </Grid>

			<Grid  item>
				<Paper elevation={3} className={cx(styles.card,styles.recovered)}>
					<Typography color="textSecondary">Recoverd</Typography>
					<Typography variant="h6">
					<strong><CountUp start={0} end={data.total_recovered} duration={2.75} separator="," /></strong>
					</Typography>
					<Typography  noWrap={true}  variant="caption">
					<CountUp start={0} end={data.total_serious_cases} duration={2.75} separator="," /> serious
					</Typography>
      			</Paper>
            </Grid>

			<Grid item>
			<Paper elevation={3} className={cx(styles.card,styles.deaths)}>
					<Typography color="textSecondary">Deaths</Typography>
					<Typography variant="h6" component="h2">
					<strong><CountUp start={0} end={data.total_deaths} duration={2.75} separator="," /></strong>
					</Typography>
					<Typography  noWrap={true}  variant="caption">
					+<CountUp start={0} end={data.total_new_deaths_today} duration={2.75} separator="," /> new deaths
					</Typography>
			  </Paper>
            </Grid>

			<Grid item>
			<Paper elevation={3} className={cx(styles.card,styles.rank)}>
				<Typography style={{  lineHeight: '1em',    color: 'rgba(0, 0, 0, 0.54)'}} noWrap={data.total_affected_countries ? false : true}  variant={data.total_affected_countries ? "subtitle1" : "body2"}>
				{data.total_affected_countries ? "Total Affected Countries" : "Total Danger Rank"}
				</Typography>
				<Typography variant="h5" component="h2" align="center">
				<strong><CountUp start={0} end={data.total_affected_countries ? data.total_affected_countries : data.total_danger_rank} duration={2.75} separator="," /></strong>
					</Typography>
      		</Paper>
            </Grid>

        </Grid>
      </Grid>


    </div>
  )
}
export default Cards;
