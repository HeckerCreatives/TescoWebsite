import { Typography } from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";

const DropDownMenu = ({
  defaultValue,
  dropValue,
  codeType = false,
  yearType = false,
  topicType = false,
  setResponse,
  setTopic,
  returnType = false,
  getDropState,
}) => {
  // const [topicState, setTopicState] = useState(null);
  const token = jwtDecode(localStorage.getItem("token"));
  const role = localStorage.getItem("tesco");
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    if (role === "admin") {
      setDatas(dropValue?.data?.data);
    } else {
      const filtered = dropValue?.data?.data.filter(
        (e) => e.user_id === token.id
      );
      setDatas(filtered);
    }
  }, [dropValue, role, token.id]);

  const onOptionChangeHandler = (e) => {
    setResponse(JSON.parse(e.target.value));

    setTopic(false);
  };

  return (
    <>
      {returnType ? (
        <select
          name="drop-menu"
          id="drop-menu"
          onChange={onOptionChangeHandler}
        >
          <option value={null}>Please select topic</option>
          {topicType &&
            dropValue &&
            datas?.map((each, index) => (
              <option value={JSON.stringify(each)}>{each.topic}</option>
            ))}
        </select>
      ) : (
        <select
          name="drop-menu"
          id="drop-menu"
          onChange={onOptionChangeHandler}
        >
          <option defaultValue={"Topic"}>Please select topic</option>
          {topicType &&
            dropValue &&
            datas?.map((each, index) => (
              <option value={JSON.stringify(each)}>{each.topic}</option>
            ))}
        </select>
      )}
    </>
  );
};

export default DropDownMenu;
