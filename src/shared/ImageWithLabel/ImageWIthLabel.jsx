import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const ImageWIthLabel = ({
  setImage,
  setpath,
  setLabel,
  setWidth,
  setHeight,
  labelVariant,
  keys,
  parameters,subType=false
}) => {

  return (
    <>
    {!subType&&
     <Link to={`/${setpath}`} style={{textDecoration:"none"}}>
     <Stack
     sx={{
       backgroundColor:setpath===parameters&&"rgba(0, 0, 0, 0.402);",
       padding:"0.5em 2em",
       borderRadius:"0.7em"
     }}
     spacing={2} direction="row" alignItems={"center"} >
     
         <Box
           sx={{
             backgroundImage: `url(${setImage})`,
             width: setWidth,
             height: setHeight,
             backgroundSize: "fill",
             backgroundRepeat: "no-repeat",
             
             cursor: "pointer",
           }}
         />

         <Typography
           sx={{ cursor: "pointer" }}
           variant={labelVariant}
           fontWeight={"600"}
           color={"white"}
         >
           {setLabel}
         </Typography>
         
     
     </Stack>
     </Link>
    }
    {subType&&
     <Link to={`/sub-dashboard/${setpath}`} style={{textDecoration:"none"}}>
     <Stack
     sx={{
       backgroundColor:setpath===parameters&&"rgba(0, 0, 0, 0.402);",
       padding:"0.5em 2em",
       borderRadius:"0.7em"
     }}
     spacing={2} direction="row" alignItems={"center"} >
     
         <Box
           sx={{
             backgroundImage: `url(${setImage})`,
             width: setWidth,
             height: setHeight,
             backgroundSize: "fill",
             backgroundRepeat: "no-repeat",
             
             cursor: "pointer",
           }}
         />

         <Typography
           sx={{ cursor: "pointer" }}
           variant={labelVariant}
           fontWeight={"600"}
           color={"white"}
         >
           {setLabel}
         </Typography>
         
     
     </Stack>
     </Link>}
     
    </>
  );
};

export default ImageWIthLabel;
