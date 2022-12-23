import React from "react";
import { Box, Typography, Stack } from "@mui/material";


const ImageWIthLabel = ({setImage,setLabel,setWidth,setHeight,labelVariant}) => {
  return (
    <>
      <Stack spacing={2} direction="row"  alignItems={"center"}>
        <Box
          sx={{
            backgroundImage: `url(${setImage})`,
            width:setWidth,
            height:setHeight,
            backgroundSize: "fill",
            backgroundRepeat: "no-repeat",
            
            cursor:"pointer"
          }}
        />

        <Typography sx={{cursor:"pointer"}} variant={labelVariant} fontWeight={"600"} color={"white"}>
          {setLabel}
        </Typography>
      </Stack>
    </>
  );
};

export default ImageWIthLabel;
