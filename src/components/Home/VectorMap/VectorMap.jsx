import React, { Fragment,useState } from "react";
import ReactTooltip from "react-tooltip";
import { Typography} from '@material-ui/core';
import MapChild from "./MapChild";


const VectorMap = ({ AllCountriesData }) =>
{
  const [content, setContent] = useState("");
  return (
    <div>
      {AllCountriesData ? <Fragment><MapChild setTooltipContent={setContent} AllCountriesData={AllCountriesData}/>
      <ReactTooltip type="light">{content}</ReactTooltip></Fragment> : <h3>Fetching Data, Please wait...</h3>}
      <Typography style={{display:'block', marginBottom:'10px',fontSize:`${window.screen.width > 700 ? '16px' : '12px'}`}} align="center" variant="caption">
      {window.screen.width>768 ? "* Hover on any country on map for details *" : "*Zoom and Click on any country on map for details*"}
        </Typography>
   </div>
  );
}

export default VectorMap;
