import React,{ useState, useEffect } from 'react';
import styles from './Table.module.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const useStyles = makeStyles(theme => ({
	root: {
    width:'100vw',
    'overflow-x' : 'visible',
    display:"flex",
    'justify-content':'center',
    margin: '10px',
    '@media screen and (max-width:780px)': {
      margin:0,
      display:"block",
      'overflow-x' : 'visible',

    }
  },
  
    table: {
       width: '70%',
       '@media screen and (max-width:780px)': {
        margin:0,
        display:"block",
        width:"fit-content"
      }
    },

    head:{
      width: 'auto',
      backgroundColor: 'grey',
    },

    row: {
      width: 'auto',
      backgroundColor: 'grey',

    },
    cell_total: {
      minWidth: 1,
      backgroundColor: 'rgba(255,0,0,0.5)'
    },
    cell_recovered: {
		 minWidth: 1,
        backgroundColor: 'rgba(0,255,0,0.5)'
      },

      ptag:{
        fontSize: 14,
        'text-align':'center',
        "text-color" : "black",
        'font-weight':500,
        padding:0,
        margin:0,
        '@media screen and (max-width:780px)': {
          fontSize: 12
        }
      },
      ptag2:{
        fontSize: 12,
        'text-align':'center',
        "text-color" : "black",
        'font-weight':400,
        padding:0,
        margin:0,
        '@media screen and (max-width:780px)': {
          fontSize: 10
        }
      },
  }));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
    'font-weight':"normal",
    padding:'3px',
    'text-align':'center',
    '@media screen and (max-width:780px)': {
      padding:'2px',
    }
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);	

const SortingFunction = (data) =>
{
  const [sortBy,setsortBy] = useState("TotalConfirmed");
  const [order,setOrder] = useState(true);
    const sortedData = React.useMemo(() =>
    { 
      let items=[];
      if(data)
      {
        items = [...data]
        if(order===true)
          items.sort((a,b) => b[sortBy]-a[sortBy]);
        else if(order===false)
          items.sort((a,b) => a[sortBy]-b[sortBy]);
      }
      return items;
  },[sortBy,data,order]);
  
  const requestSort = (param, order_param) => {
    setsortBy(param);
    setOrder(!order_param);
  }

  return {sortedData, requestSort, order, sortBy};
}

export default function MyTable(props)
{
  //order | false = asec | true = dsec
  const {sortedData, requestSort, order, sortBy} = SortingFunction(props.AllCountriesData);
  const classes = useStyles();


  if(!props.AllCountriesData)
  {
    return(<h3>Fetching Data, Please wait...</h3>)
  }
  

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Country</StyledTableCell>
            <StyledTableCell onClick={() => requestSort('TotalConfirmed',order)} align="right">Total
              {order  ? <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon> : null}
              {!order ? <ArrowDropUpIcon fontSize="small"></ArrowDropUpIcon> : null}
            </StyledTableCell>

            <StyledTableCell align="right">Active
            </StyledTableCell>

            <StyledTableCell onClick={() => requestSort('TotalRecovered',order)} align="right">Rcvred
              {order  ? <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon> : null}
              {!order  ? <ArrowDropUpIcon fontSize="small"></ArrowDropUpIcon> : null}
            </StyledTableCell>

            <StyledTableCell onClick={() => requestSort('TotalDeaths',order)} align="right">Deaths
              {order ? <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon> : null }
              {!order ? <ArrowDropUpIcon fontSize="small"></ArrowDropUpIcon> : null}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <StyledTableRow key={row.ourid}>
              <StyledTableCell component="th" scope="row">{row.Country}</StyledTableCell>
              <StyledTableCell className={classes.cell_total} align="right"><p className={classes.ptag}>{row.TotalConfirmed.toLocaleString()}</p>
              																<p className={classes.ptag2}>+{row.NewConfirmed.toLocaleString()}</p>
              </StyledTableCell>
              <StyledTableCell align="right"><p className={classes.ptag}>{
                (row.TotalConfirmed-(row.TotalRecovered+row.TotalDeaths)).toLocaleString()
              }</p></StyledTableCell>
              <StyledTableCell className={classes.cell_recovered} align="right"><p  className={classes.ptag}>{row.TotalRecovered.toLocaleString()}</p>
                                                                                <p className={classes.ptag2}>+{row.NewRecovered.toLocaleString()}</p>
              </StyledTableCell>
              <StyledTableCell  align="right"><p className={classes.ptag}>{row.TotalDeaths.toLocaleString()}</p>
											<p className={classes.ptag2}>+{row.NewDeaths.toLocaleString()}</p>

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}