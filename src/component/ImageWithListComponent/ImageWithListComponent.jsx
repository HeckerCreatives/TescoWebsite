import React from "react";
import ButtonLabel from "../../shared/Button/ButtonLabel";
import searchIcon from "../../Assest/Topic/SearchBtn.png";
import { Box, Grid, Typography } from "@mui/material";
import DataTable from "../TabelComponent/TabelComponent";
import "./imagewithlist.css";
import DropDownMenu from "../../shared/DropDownMenu/DropDownMenu";
import QuestionComponent from "../QuestionComponent/QuestionComponent";
import InputLabel from "../../shared/InputLabel/InputLabel";
import ScrollComponent from "../ScrollComponent/ScrollComponent";
import { MDBIcon, MDBInputGroup } from "mdb-react-ui-kit";
import { motion } from "framer-motion";

const ImageWithListComponent = ({
  tableType,
  questionType = "table",
  searchType = true,
  setImage,
  labelList,
  buttonLabel,
  tableHead,
  cellData,
  optionType = false,
  setting = false,
  setType,
  settingPlaceholder1,
  settingPlaceholder2,
  settingPlaceholder3,
  pagination = true,
}) => {
  return (
    <Box className="Image-with-list-container">
      <Box className="image-with-list-main">
        <Box className="image-container">
          <motion.div animate={{ rotate: -360, transition: { duration: 0.3 } }}>
            <figure>
              <img src={setImage} alt="" className="image-list" />
            </figure>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Typography
              sx={{ marginLeft: "0.3em" }}
              variant="h6"
              color={"grey"}
            >
              {labelList}
            </Typography>
          </motion.div>
        </Box>
        {searchType && (
          <motion.div initial={{y:-10,opacity:0}}
          animate={{y:0,opacity:1}}
          exit={{y:0,opacity:0}}
          >
                   <Box
            display={"flex"}
            alignItems="center"
            gap={1}
            paddingLeft={"2em"}
            className="setting-type-container"
            paddingRight={"1em"}
          >
            {/* <Typography
              color={"grey"}
              variant="h5"
              className="search-typo-text"
            >
              Search
            </Typography> */}
            <MDBInputGroup
              className="mb-3"
              noBorder
              textBefore={"Search"}
              textAfter={<MDBIcon fas icon="search" />}
            >
              <input type={"text"} className="form-control" />
            </MDBInputGroup>
          </Box>
          </motion.div>
     
        )}
        {optionType === "none" && (
          <Box padding={3}>
            <ButtonLabel
              buttonLabel={buttonLabel}
              setSize="medium"
              styles={{
                fontSize: "1.2em",
                width: "15em",
                backgroundColor: "#ebad00",
                color: "white",
              }}
            />
          </Box>
        )}
      </Box>
      {optionType === "option" && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Grid
            container
            direction={"row"}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
            gap={10}
            padding={2}
            
          >
            <Grid item xs={12} lg={12} xl={3}>
              <DropDownMenu defaultValue={"Choose Topics"} />
            </Grid>
            <Grid item xs={12} lg={12} xl={3}>
              <DropDownMenu defaultValue={"Choose year"} />
            </Grid>
            <Grid item xs={12} lg={12} xl={3}>
              <DropDownMenu defaultValue={"Choose Generated code"} />
            </Grid>
          </Grid>
        </motion.div>
      )}
      {questionType === "table" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          padding={3}
        >
          <DataTable
            cellData={cellData}
            tableHead={tableHead}
            tableType={tableType}
            pagination={pagination}
          />
        </motion.div>
      )}
      {questionType === "question-choice" && (
        // <ScrollComponent styles={{  padding: "1em" }}>

        <Grid container spacing={5} padding={2}>
          <Grid item lg={12} md={12} xl={12} xs={12} sm={12}>
            <motion.div initial={{opacity:0}} animate={{opacity:1,transition:{duration:0.3}}} exit={{opacity:0}}>
            <QuestionComponent
              setType={"default"}
              setPrimaryText={"QUESTION1:"}
              setSecondarytext={"MULTIPLE CHOICE"}
              setDetails={
                "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
              }
            />
            </motion.div>
          
          </Grid>
          <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
          <motion.div initial={{opacity:0}} animate={{opacity:1,transition:{duration:0.3}}} exit={{opacity:0}}>
          <QuestionComponent
              setType={"correct"}
              setPrimaryText={"CHOICE 1:"}
              setSecondarytext={"Correct"}
              setDetails={
                "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
              }
            />
          </motion.div>
           
          </Grid>
          
          <Grid item lg={6} md={12} xl={6} sm={12} sx={12}>
          <motion.div initial={{opacity:0}} animate={{opacity:1,transition:{duration:0.3}}} exit={{opacity:0}}>
          <QuestionComponent
              setType={"wrong"}
              setPrimaryText={"CHOICE 2:"}
              setSecondarytext={"Wrong"}
              setDetails={
                "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
              }
            />
          </motion.div>
           
          </Grid>
          
          <Grid item lg={6} md={12} xl={6} xs={12} sm={12}>
          <motion.div initial={{opacity:0}} animate={{opacity:1,transition:{duration:0.3}}} exit={{opacity:0}}>
          <QuestionComponent
              setType={"wrong"}
              setPrimaryText={"CHOICE 3:"}
              setSecondarytext={"Wrong"}
              setDetails={
                "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
              }
            />
          </motion.div>
          
          </Grid>
          <Grid item lg={6} md={12} xl={6} sx={12} sm={12}>
          <motion.div initial={{opacity:0}} animate={{opacity:1,transition:{duration:0.3}}} exit={{opacity:0}}>
          <QuestionComponent
              setType={"wrong"}
              setPrimaryText={"CHOICE 4:"}
              setSecondarytext={"Wrong"}
              setDetails={
                "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
              }
            />
          </motion.div>
          
          </Grid>
        </Grid>

        // </ScrollComponent>
      )}
      {questionType === "question-answer" && (
        <Grid container spacing={5} padding={2}>
          <Grid item lg={12} md={12} xl={12} sm={12} xs={12}>
            <QuestionComponent
              setType={"default"}
              setPrimaryText={"QUESTION1:"}
              setSecondarytext={"MULTIPLE CHOICE"}
              setDetails={
                "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
              }
            />
          </Grid>
          <Grid item lg={12} md={12} xl={12}>
            <QuestionComponent
              setType={"correct"}
              setPrimaryText={"Answer"}
              typeValue={false}
              setDetails={
                "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used"
              }
            />
          </Grid>
        </Grid>
      )}
      {setting && (
        <Grid padding={2} container spacing={5} className="setting-grid">
          <Grid item xl={4}>
            <InputLabel
              setType={setType}
              inputPlaceHolder={settingPlaceholder1}
            />
          </Grid>
          <Grid item xl={4}>
            <InputLabel
              setType={setType}
              inputPlaceHolder={settingPlaceholder2}
            />
          </Grid>
          <Grid item xl={4}>
            <InputLabel
              setType={setType}
              inputPlaceHolder={settingPlaceholder3}
            />
          </Grid>
          <Grid
            item
            xl={2}
            lg={4}
            md={4}
            sm={6}
            xs={12}
            padding={2}
            marginLeft="auto"
          >
            <ButtonLabel
              buttonLabel="Save"
              styles={{
                fontSize: "1.2em",
                width: "15em",
                backgroundColor: "rgb(68, 68, 242)",
                color: "white",
              }}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ImageWithListComponent;
