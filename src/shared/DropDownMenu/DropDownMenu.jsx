import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const DropDownMenu = ({
  defaultValue,
  dropValue,
  codeType = false,
  yearType = false,
  topicType = false,
  setResponse,
  setTopic
}) => {
 
  const [topicState, setTopicState] = useState(null);
  const onOptionChangeHandler = (e) => {
    // setDropValue(e.target.value)
    setTopicState(e.target.value);
    setTopic(false)
  };
  
 
  useEffect(() => {
    const response =dropValue&&dropValue?.data?.data[topicState]
    setResponse(response)
  }, [topicState]);

  
  

  return (
    <>
      <select name="drop-menu" id="drop-menu" onChange={onOptionChangeHandler}>
      <option defaultValue={"Topic"}></option>
        {topicType &&
          dropValue &&
          dropValue?.data?.data?.map((each, index) => (
            <option value={index}>{each.topic}</option>
          ))}

     
      </select>
    </>
  );
};

export default DropDownMenu;
