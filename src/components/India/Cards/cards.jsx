import React from 'react';
import { Paper,Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import styles from './cards.module.css';

const Cards = ({ data }) => {
	
  if (!data.confirmed) 
  {
    return(<h3>Loading...</h3>);
  }	

  return(
    <div className={styles.container}>
	<Grid item xs={12} sm={12}>
        <Grid style={{width:"100%" , margin:0}} container justify="center" spacing={2}>
			
            <Grid item>
				<Paper elevation={3}  className={cx(styles.card,styles.total)}>
				<Typography  noWrap={true} color="textSecondary">Total Cases</Typography>
	            <Typography variant="h6">
	              <strong><CountUp start={0} end={Number(data.confirmed)} duration={2.75} separator="," /></strong>		
	            </Typography>
				<Typography  noWrap={true} variant="caption">
					+<CountUp start={0} end={Number(data.deltaconfirmed)} duration={2.75} separator="," /> new cases
				</Typography>
				</Paper>
            </Grid>

			<Grid item>
				<Paper elevation={3} className={cx(styles.card,styles.active)}>
				<Typography color="textSecondary">Active</Typography>
	            <Typography variant="h6" component="h2">
				<strong><CountUp start={0} end={Number(data.active)} duration={2.75} separator="," /></strong>
	            </Typography>
				<Typography  noWrap={true} variant="caption">
					<CountUp start={0} end={Number((data.active/data.confirmed)*100)} duration={2.75} separator="," />% of total cases
				</Typography>
      			</Paper>
            </Grid>

			<Grid  item>
				<Paper elevation={3} className={cx(styles.card,styles.recovered)}>
				<Typography color="textSecondary">Recoverd</Typography>
	            <Typography variant="h6">
				<strong><CountUp start={0} end={Number(data.recovered)} duration={2.75} separator="," /></strong>
	            </Typography>
				<Typography  noWrap={true} variant="caption">
					+<CountUp start={0} end={Number(data.deltarecovered)} duration={2.75} separator="," /> new recoveries
				</Typography>
      			</Paper>
            </Grid>

			<Grid item>
			<Paper elevation={3} className={cx(styles.card,styles.deaths)}>
			<Typography color="textSecondary">Deaths</Typography>
	            <Typography variant="h6" component="h2">
				<strong><CountUp start={0} end={Number(data.deaths)} duration={2.75} separator="," /></strong>
	            </Typography>
				<Typography  noWrap={true} variant="caption">
					+<CountUp start={0} end={Number(data.deltadeaths)} duration={2.75} separator="," /> new deaths
				</Typography>
			  </Paper>
            </Grid>

        </Grid>
      </Grid>
	</div>
  )
}
export default Cards;
