import { Paper } from "@mui/material";
import React from "react";
import "./inputlabel.css";
import image from "../../Assest/Login/eye.png";
const InputLabel = ({ inputPlaceHolder, setType, passwordTypes = false }) => {
  const styles = {
    paperContainer: {
      backgroundImage: `url(${image})`,
      backgroundSize: "fill",
      backgroundRepeat: "no-repeat",
    
    },
  };
  return (
    <React.Fragment>
      <div className="input-label-container">
        <input
          type={setType}
          className="input-label"
          placeholder={inputPlaceHolder}
        />
        {passwordTypes && <Paper style={styles.paperContainer} />}
      </div>
    </React.Fragment>
  );
};

export default InputLabel;
