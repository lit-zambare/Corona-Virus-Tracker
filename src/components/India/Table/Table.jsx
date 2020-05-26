import React,{ useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
	root: {
    width: 'fit-content',
    display : 'flex',
    'overflow-x' : 'visible',
    marginLeft:"20px",
    alignItems:'center',
    
    '@media screen and (max-width:780px)': {
      margin:0,
      display:"block",
    }
	},
    table: {
       width: 'fit-content',
       '@media screen and (max-width:780px)': {
        margin:0,
        display:"block",
       }
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
      }
  }));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    "text-align":'center',
  },
  body: {
    width:'fit-content',
    fontSize: 14,
    padding:'4px',
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

const SortingFunctionState = ({StatesData}) =>
{ 
    const [sortBy,setsortBy] = useState("confirmed");
    const [order,setOrder] = useState(true);
    const sortedData = React.useMemo(() =>
    {   
      let items = [] ;
        if(StatesData)
        {
          items = [...StatesData]
          if(order===true)
            items.sort((a,b) => Number(b[sortBy])-Number(a[sortBy]));
          else if(order===false)
            items.sort((a,b) => Number(a[sortBy])-Number(b[sortBy]));
        }
        return items;
    },[sortBy,StatesData,order]);

  
  const requestSort = (param, order_param) => {
    setsortBy(param);
    setOrder(!order_param);
  }

  return {sortedData, requestSort, order, sortBy};
}

const SortingFunctionDistrict = (row,DistrictData) =>
{ 
  const [sortBy,setsortBy] = useState("confirmed");
  const [order,setOrder] = useState(true);

  const sortedData = React.useMemo(() =>
  {   
      let items =[];
      const data = DistrictData.find(district => district.state === row.state);
      if(data)
      {
        items = [...data.districtData];
      if(order===true)
        items.sort((a,b) => Number(b[sortBy])-Number(a[sortBy]));
      else if(order===false)
        items.sort((a,b) => Number(a[sortBy])-Number(b[sortBy]));
      }
      return items;
  },[sortBy,DistrictData,order,row]);


const requestSort = (param, order_param) => {
  setsortBy(param);
  setOrder(!order_param);
}

return {sortedData, requestSort, order, sortBy};
}



const DistrictRow = ({row}) => {
  const classes = useStyles();

  return(
      <StyledTableRow >
        <StyledTableCell component="th" scope="row">{row.district}</StyledTableCell>
        <StyledTableCell className={classes.cell_total} align="right"><p className={classes.ptag}>{parseInt(row.confirmed).toLocaleString()}</p>
                                        <p className={classes.ptag2}>+{parseInt(row.delta.confirmed).toLocaleString()}</p>
        </StyledTableCell>

        <StyledTableCell align="right"><p className={classes.ptag}>{parseInt(row.active).toLocaleString()}</p></StyledTableCell>

        <StyledTableCell className={classes.cell_recovered} align="right"><p className={classes.ptag}>{parseInt(row.recovered).toLocaleString()}</p>
                                        <p className={classes.ptag2}>+{parseInt(row.delta.recovered).toLocaleString()}</p>
        </StyledTableCell>

        <StyledTableCell  align="right"><p className={classes.ptag}>{parseInt(row.deceased).toLocaleString()}</p>
                      <p className={classes.ptag2}>+{parseInt(row.delta.deceased).toLocaleString()}</p>

        </StyledTableCell>
    </StyledTableRow>
  );
}


const ExpandableTableRow = ({row,DistrictData}) => {
  const {sortedData, requestSort, order, sortBy} = SortingFunctionDistrict(row,DistrictData);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();



  return (
    <React.Fragment>
      <StyledTableRow >
        <StyledTableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">{row.state}</StyledTableCell>
        <StyledTableCell className={classes.cell_total} align="right"><p className={classes.ptag}>{parseInt(row.confirmed).toLocaleString()}</p>
              													<p className={classes.ptag2}>+{parseInt(row.deltaconfirmed).toLocaleString()}</p>
        </StyledTableCell>

        <StyledTableCell align="right"><p className={classes.ptag}>{parseInt(row.active).toLocaleString()}</p></StyledTableCell>

        <StyledTableCell className={classes.cell_recovered} align="right"><p className={classes.ptag}>{parseInt(row.recovered).toLocaleString()}</p>
                                        <p className={classes.ptag2}>+{parseInt(row.deltarecovered).toLocaleString()}</p>
        </StyledTableCell>

        <StyledTableCell  align="right"><p className={classes.ptag}>{parseInt(row.deaths).toLocaleString()}</p>
											<p className={classes.ptag2}>+{row.deltadeaths}</p>

        </StyledTableCell>
      </StyledTableRow>

      <StyledTableRow>
          <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={window.screen.width > 768 ? 3 : 2}>
                  <Typography variant="h6" gutterBottom component="div">{row.state}
                  </Typography>

                  <Table aria-label="collapsible table" className={classes.table} stickyHeader>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>District</StyledTableCell>
                      <StyledTableCell onClick={() => requestSort('confirmed',order)} align="right">Total
                        {order && sortBy==="confirmed" ? <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon> : null}
                        {!order && sortBy==="confirmed" ? <ArrowDropUpIcon fontSize="small"></ArrowDropUpIcon> : null}
                      </StyledTableCell>

                      <StyledTableCell onClick={() => requestSort('active',order)} align="right">Active
                        {order && sortBy==="active" ? <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon> : null}
                        {!order && sortBy==="active" ? <ArrowDropUpIcon fontSize="small"></ArrowDropUpIcon> : null}
                      </StyledTableCell>

                      <StyledTableCell onClick={() => requestSort('recovered',order)} align="right">Rcvrd
                        {order && sortBy==="recovered" ? <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon> : null}
                        {!order && sortBy==="recovered" ? <ArrowDropUpIcon fontSize="small"></ArrowDropUpIcon> : null}
                      </StyledTableCell>

                      <StyledTableCell onClick={() => requestSort('deaths',order)} align="right">Deaths
                        {order && sortBy==="deaths" ? <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon> : null }
                        {!order && sortBy==="deaths" ? <ArrowDropUpIcon fontSize="small"></ArrowDropUpIcon> : null}
                      </StyledTableCell>
                      </TableRow>
                  </TableHead>

              <TableBody>
                {sortedData.map((row) => (
                      <DistrictRow key={row.district} row={row}/>
                ))}

            </TableBody>
          </Table>

                </Box>
              </Collapse>
            </StyledTableCell>
        </StyledTableRow>
    </React.Fragment>
  );
};




export default function MyTable(props)
{
  const {sortedData, requestSort, order, sortBy} = SortingFunctionState(props);
  const classes = useStyles();

  //order | false = asec | true = dsec

  if(!props.StatesData)
  {
    return(<h3>Fetching Data, Please wait...</h3>)
  }

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table aria-label="collapsible table" className={classes.table} stickyHeader>
        <TableHead>
          <TableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell>State</StyledTableCell>
            <StyledTableCell onClick={() => requestSort('confirmed',order)} align="right">Total
              {order && sortBy==="confirmed" ? <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon> : null}
              {!order && sortBy==="confirmed" ? <ArrowDropUpIcon fontSize="small"></ArrowDropUpIcon> : null}
            </StyledTableCell>

            <StyledTableCell onClick={() => requestSort('active',order)} align="right">Active
              {order && sortBy==="active" ? <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon> : null}
              {!order && sortBy==="active" ? <ArrowDropUpIcon fontSize="small"></ArrowDropUpIcon> : null}
            </StyledTableCell>

            <StyledTableCell onClick={() => requestSort('recovered',order)} align="right">Rcvrd
              {order && sortBy==="recovered" ? <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon> : null}
              {!order && sortBy==="recovered" ? <ArrowDropUpIcon fontSize="small"></ArrowDropUpIcon> : null}
            </StyledTableCell>

            <StyledTableCell onClick={() => requestSort('deaths',order)} align="right">Deaths
              {order && sortBy==="deaths" ? <ArrowDropDownIcon fontSize="small"></ArrowDropDownIcon> : null }
              {!order && sortBy==="deaths" ? <ArrowDropUpIcon fontSize="small"></ArrowDropUpIcon> : null}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <ExpandableTableRow key={row.statecode} row={row} DistrictData={props.DistrictData}/>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
}