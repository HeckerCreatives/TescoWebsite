import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import './buttonlable.css'
export default function ButtonLabel({
  buttonVariant,
  buttonLabel,
  handleCLick,
  setDefaultlValue,
  setSize = "medium",
  loginType=true,
  styles
}) {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant={buttonVariant}
        onClick={handleCLick}
        defaultValue={setDefaultlValue}
        size={setSize}
        className={"button-class-variant"}
        sx={styles}
      >
        {buttonLabel}
      </Button>
    </Stack>
  );
}
