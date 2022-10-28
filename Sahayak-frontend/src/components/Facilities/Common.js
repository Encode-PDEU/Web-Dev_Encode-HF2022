import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  header: {
    marginTop: "50px",
  },
});
const Common = (props) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Add {props.name} Details
        </Typography>
      </Box>
    </>
  );
};

export default Common;
