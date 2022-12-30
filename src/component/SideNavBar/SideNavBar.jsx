import { Grid, Paper, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import image from "../../Assest/Navigation/sidebar.png";
import ImageWIthLabel from "../../shared/ImageWithLabel/ImageWIthLabel";
import logo from "../../Assest/Navigation/title.png";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import { sideNavData } from "../../utils/sideNavData/sideNavData";
import ButtonLabel from "../../shared/Button/ButtonLabel";
import { motion } from "framer-motion";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";

import { useNavigate } from "react-router-dom";
import "./sidenavbar.css";
import { useRef,useEffect} from "react";
import ScrollComponent from "../ScrollComponent/ScrollComponent";
const SideNavBar = ({
  parameters,
  role,
  sideNavData = [],
  subType,
  setTigger,
  children,
}) => {
  const history = useNavigate();
  const handleLogout = () => {
    history("/");
  };
  const [isOpen, setOpen] = useState(true);
  const styles = {
    paperContiner: {
      backgroundImage: isOpen ? `url(${image})` : null,
      backgroundSize: "fill",
      backgroundRepeat: "no-repeat",
      height: "120vh",
      minWidth: "20em",
    },
  };

  const open = () => {
    setOpen(true);
    setRotaion(rotation + 180);
  };
  const close = () => {
    setOpen(false);
    setRotaion(rotation - 180);
  };

  const [rotation, setRotaion] = useState(0);
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });
  return (
    <div className="side-bar-style-container-active" >
      <motion.div animate={{ width: isOpen ? "20em" : "0px" }}>
        <Box style={styles.paperContiner} className="paper-side-bar" ref={menuRef}>
          <Grid
            container
            spacing={1}
            direction="column"
            alignItems={"center"}
            borderBottom={isOpen ? "1px solid white" : ""}
          >
            <Grid
              container
              padding={5.5}
              direction={"row"}
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
            >
              {isOpen && (
                <Grid item>
                  <img
                    src={logo}
                    alt=""
                    className="iamge-logonavbar"
                    style={{ width: "10em" }}
                  />
                </Grid>
              )}

              <Grid item zIndex={2}>
                <motion.div
                  animate={{ rotate: rotation }}
                  onClick={() => (isOpen ? close() : open())}
                >
                  <button
                    onClick={""}
                    style={{
                      backgroundColor: "transparent",
                      outline: "none",
                      border: "none",

                      //     border:"none",
                      //   cursor:"pointer",
                      // borderRadius:"50%",
                      boxShadow:"rgb(51, 51, 51) 0px 0px 0px 3px"
                    }}
                  >
                    <FormatAlignRightIcon
                      fontSize="large"
                      sx={{
                        color: "white",
                      }}
                    />
                  </button>
                </motion.div>
              </Grid>
            </Grid>
            {isOpen && (
              <Grid item>
                <Typography variant="h5" fontWeight={"700"} color={"white"}>
                  {role}
                </Typography>
              </Grid>
            )}
          </Grid>
          {isOpen && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {sideNavData.map((each, index) => (
                <Box sx={{ marginTop: "2em", padding: "0em 1em" }} key={index}>
                  <ImageWIthLabel
                    setImage={each.image}
                    setpath={each.values}
                    labelVariant={"h6"}
                    setLabel={each.label}
                    setIcon={each.icon}
                    parameters={parameters}
                    subType={subType}
                  />
                </Box>
              ))}
            </Box>
          )}

          {isOpen && (
            <Box
              display={"flex"}
              alignItems="flex-end"
              justifyContent={"center"}
              sx={{
                marginTop:"7em"
              }}
            >
              <ButtonLabel
                buttonLabel={"Logout"}
                handleCLick={handleLogout}
                styles={{
                  fontSize: "1.2em",
                  width: "10em",
                  backgroundColor: "#ebad00",
                  color: "black",
                }}
              />
            </Box>
          )}
        </Box>
      </motion.div>

      <main className="main-child-container">{children}</main>
    </div>
  );
};

export default SideNavBar;
