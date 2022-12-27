import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "./cardindicator.css";
import TabelComponent from "../TabelComponent/TabelComponent";
import { monthData } from "../../utils/fakedata/fakedata";
import Charts from "../Chart/Charts";
import ApexChart from "../ApexChart/ApexChart";


const Cardindicator = ({
  chartEnable = false,
  setTitle,
  setDetails,
  darkTheme = true,
  tableHead
}) => {
  return (
    <Box className="card-with-indicator-container">
      <Box className="card-with-indicator-main">
        <Box
          className="card-with-indicator-label-container"
          sx={{
            backgroundColor: darkTheme ? "rgb(18, 88, 240)" : "#ebad00",
            padding:"1em"
          }}
        >
          <Typography
            textAlign={"left"}
            variant="h6"
            color={darkTheme ? "white" : "black"}
          >
            {setTitle}
          </Typography>
          <Typography
            textAlign={"left"}
            variant="body1"
            color={darkTheme ? "white" : "black"}
          >
            {setDetails}
          </Typography>
        </Box>
      </Box>
      {!chartEnable && 
      <Box padding={2}>
        <TabelComponent tableType={"result"} tableHead={monthData}/>
       </Box>}
       {chartEnable && 
      // <ApexChart/>
       <Charts/>
       }
    </Box>
  );
};

export default Cardindicator;
