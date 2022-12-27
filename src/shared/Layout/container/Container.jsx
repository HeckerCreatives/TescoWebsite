import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Checkbox,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import "./container.css";
import image from "../../../BG.png";
import loginHolderImage from "../../../Loginholder.png";
import logo from "../../../Title.png";
import InputLabel from "../../InputLabel/InputLabel";
import CheckboxLabels from "../../CheckBox/CheckBox";
import ButtonLabel from "../../Button/ButtonLabel";
import { useState } from "react";
import{useNavigate} from 'react-router-dom'
export default function CustomContainer({
  maxWidth,
  paperImage,
  paperImageContainer = false,
 
}) {
  const styles = {
    paperContainer: {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100%",
      width: "100%",
    },
  };
 const history=useNavigate()
const [username,setUsername]=useState("")
const[password,setPassword]=useState("")
const[error,setError]=useState("")


const handleSubmit=()=>{
    if(username&&password==="admin"){
     history('/dashboard')
    }else{
      setError("PASSWORD OR USERNAME DOES'NT MATCH")
    }
}
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={maxWidth} >
        <Box sx={{ bgcolor: "#ffffff80", height: "100vh" }}>
          <Paper style={styles.paperContainer}>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Grid item xs={12} md={12} sm={12} lg={12} marginTop="5em">
                <img
                  src={loginHolderImage}
                  className="imageLogin"
                  alt="loginHolder"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    padding: 0,
                    margin: 0,
                  }}
                />
              </Grid>
              <Stack
                direction={"column"}
                spacing={1}
                alignItems={"center"}
                position="absolute"
              >
                <Grid item xs={12} md={12} sm={12} lg={12} marginTop="5em">
                  <img
                    src={logo}
                    className="imageLogo"
                    alt="loginHolder"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      padding: 0,
                      margin: 0,
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={12} md={12}>
                  <InputLabel
                    setType={"text"}
                    inputPlaceHolder="Please enter your username"
                    onChange={(e)=>setUsername(e.target.value)}
                    
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <InputLabel
                    setType={"password"}
                    inputPlaceHolder="Please enter your password"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6} lg={8}>
                  <CheckboxLabels checkBoxLabel={"Remeber me"} />
                </Grid>
                {error&&
                <Grid item>
                <Typography variant="body1" color={"red"}>{error}</Typography>
              </Grid>
                }
                
                <Grid item xs={8} lg={8}>
                  <ButtonLabel
                    buttonVariant={"contained"}
                    setSize={"large"}
                    buttonLabel={"Login"}
                    handleCLick={handleSubmit}
                    styles={{
                      fontSize:"1.2em",
                      width: "20em",
                      backgroundColor:"#ebad00",
                      color:"black"
                    }}
                  />
                </Grid>
              </Stack>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </React.Fragment>
  );
}
