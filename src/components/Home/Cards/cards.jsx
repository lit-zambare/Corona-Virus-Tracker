import React from 'react';
import { Card, Paper, Typography, Grid,CardContent,CardActionArea } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import styles from './cards.module.css';
import { useTheme,makeStyles } from "@material-ui/styles";
import {Link} from 'react-router-dom';




const Cards = ({ data,total }) => {

	if(Object.keys(data).length === 0 && data.constructor === Object)
	{
		return(<h3>Loading...</h3>);
	}

	if(data === undefined)
	{	
		return(<div style={{textAlign:"center",margin:25}}>
			<Typography color="secondary">Alas! Looks like the server of api is down...</Typography>
			<Typography color="secondary"><strong>You can still check India statistics <Link to="/India">here</Link></strong></Typography>
			<Typography color="error">Can't fetch global data. This will get fixed ASAP.</Typography>
			<Typography color="error">Please come back after minutes and check again...</Typography>
			<Typography color="primary"><strong>Sorry for the inconvenience</strong></Typography>
		</div>);
	}


  return(
    <div className={styles.container}>
      <Grid item xs={12} sm={12}>
        <Grid container justify="center" alignItems="flex-end" alignContent="center" spacing={2}>
			
            <Grid item>
				<Paper elevation={3}  className={cx(styles.card,styles.total)}>
					<Typography  noWrap={true}  color="textSecondary">Total Cases</Typography>
					<Typography variant={window.screen.width > 768 ? "h6" : "h6"}>
					<strong><CountUp start={0} end={data.TotalConfirmed} duration={2.75} separator="," /></strong>		
					</Typography >
					<Typography  noWrap={true} variant="caption">
					+<CountUp start={0} end={data.NewConfirmed} duration={2.75} separator="," /> new cases
					</Typography>
				</Paper>
            </Grid>

			<Grid item>
				<Paper elevation={3} className={cx(styles.card,styles.active)}>
					<Typography color="textSecondary">Active</Typography>
					<Typography variant="h6" component="h2">
					<strong><CountUp start={0} end={data.TotalConfirmed-(data.TotalRecovered+data.TotalDeaths)} duration={2.75} separator="," /></strong>
					</Typography>
					<Typography  noWrap={true}  variant="caption">
					+<CountUp start={0} end={data.NewConfirmed-(data.NewRecovered+data.NewDeaths)} duration={2.75} separator="," /> new active
					</Typography>
      			</Paper>
            </Grid>

			<Grid  item>
				<Paper elevation={3} className={cx(styles.card,styles.recovered)}>
					<Typography color="textSecondary">Recoverd</Typography>
					<Typography variant="h6">
					<strong><CountUp start={0} end={data.TotalRecovered} duration={2.75} separator="," /></strong>
					</Typography>
					<Typography  noWrap={true}  variant="caption">
					+<CountUp start={0} end={data.NewRecovered} duration={2.75} separator="," /> new recovered
					</Typography>
      			</Paper>
            </Grid>

			<Grid item>
			<Paper elevation={3} className={cx(styles.card,styles.deaths)}>
					<Typography color="textSecondary">Deaths</Typography>
					<Typography variant="h6" component="h2">
					<strong><CountUp start={0} end={data.TotalDeaths} duration={2.75} separator="," /></strong>
					</Typography>
					<Typography  noWrap={true}  variant="caption">
					+<CountUp start={0} end={data.NewDeaths} duration={2.75} separator="," /> new deaths
					</Typography>
			  </Paper>
            </Grid>

			<Grid item>
			<Paper elevation={3} className={cx(styles.card,styles.rank)}>
				<Typography style={{  lineHeight: '1em',    color: 'rgba(0, 0, 0, 0.54)'}} noWrap={data.Country ? true : false}  variant={data.Country ? "body2" : "subtitle1"}>
				{data.Country ? "Last Updated" : "Total Countries Affected"}
				</Typography>
				<Typography variant="h5" component="h2" align="center">
				{data.Country ? data.Date.split("T")[1].split(".")[0] : <><strong><CountUp start={0} end={total} duration={2.75} separator="," /> </strong></>}
					</Typography>
      		</Paper>
            </Grid>

        </Grid>
      </Grid>


    </div>
  )
}
export default Cards;
