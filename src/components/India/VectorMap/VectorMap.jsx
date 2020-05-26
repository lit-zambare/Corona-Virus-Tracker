import React, { Fragment,useState ,useEffect} from "react";
import ReactTooltip from "react-tooltip";
import { Typography} from '@material-ui/core';
import MapChild from "./MapChild";

const VectorMap = ({ state,StatesData,DistrictData }) =>
{ 
  const [content, setContent] = useState("");
  
  return (
    <div>
      {StatesData ? <Fragment>
                      <MapChild setTooltipContent={setContent} state={state} StatesData={StatesData} DistrictData={DistrictData}/>
                      <ReactTooltip type="light">{content}</ReactTooltip>
                      <Typography style={{display:'block', marginBottom:'10px',fontSize:`${window.screen.width > 700 ? '16px' : '10px'}`}} align="center" variant="caption">
                        {window.screen.width>768 ? "* Hover on any state on map for details *" : "*Zoom and Click on any state on map for details*"}
                        </Typography>
                    </Fragment> : 
                    <h3>Fetching Data, Please wait...</h3>}
    </div>
  );
}

export default VectorMap;
