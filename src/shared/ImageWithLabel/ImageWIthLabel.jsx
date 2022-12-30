import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import "./imagewithlabel.css";
import {motion} from "framer-motion"
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";

const ImageWIthLabel = ({
  setIcon,
  setpath,
  setLabel,
  
  labelVariant,
  keys,
  parameters,
  subType = false,

}) => {
  const[rotation,setRotaion]=useState(0)
  return (
    <>
      {!subType && (
        <Link to={`/${setpath}`} style={{ textDecoration: "none" }}>
          <motion.div initial={{  opacity: 0 }}
            animate={{ opacity: 1,
              transition:{
                duration:0.4
              }
             }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5}}>
              <Grid
            container
            sx={{
              backgroundColor:
                setpath === parameters && "rgba(0, 0, 0, 0.402);",
             
              borderRadius: "0.7em",
            }}
            
            alignItems={"center"}
            minWidth="15em"
            display="flex"
            
          >
             
            <motion.div animate={{rotate:rotation}} onClick={()=>setRotaion(rotation+360)}>
           
             {setIcon}
            
            </motion.div>
            
            <Grid item>
              <Typography
                sx={{ cursor: "pointer" }}
                variant={labelVariant}
                fontWeight={"600"}
                color={"white"}
                paddingLeft="1em"
                
              >
                {setLabel}
              </Typography>
            </Grid>
          </Grid>
              
            </motion.div>
          
        </Link>
      )}
      {subType && (
        <Link
          to={`/dashboard/${setpath}`}
          style={{ textDecoration: "none" }}
        >
         <motion.div initial={{  opacity: 0 }}
            animate={{ opacity: 1,
              transition:{
                duration:0.4
              }
             }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5}}>
              <Grid
            container
            sx={{
              backgroundColor:
                setpath === parameters && "rgba(0, 0, 0, 0.402);",
             
              borderRadius: "0.7em",
            }}
            
            alignItems={"center"}
            minWidth="15em"
            display="flex"
            
          >
             
            <motion.div animate={{rotate:rotation}} onClick={()=>setRotaion(rotation+360)}>
           
             {setIcon}
            
            </motion.div>
            
            <Grid item>
              <Typography
                sx={{ cursor: "pointer" }}
                variant={labelVariant}
                fontWeight={"600"}
                color={"white"}
                paddingLeft="1em"
                
              >
                {setLabel}
              </Typography>
            </Grid>
          </Grid>
              
            </motion.div>
        </Link>
      )}
    </>
  );
};

export default ImageWIthLabel;
