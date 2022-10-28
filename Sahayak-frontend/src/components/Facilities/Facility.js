import React, { useState } from "react";
import Checkbox from "./CheckBox";

const Facility = (props) => {
  const [change, handleChange] = useState(false);

  const handleChangeOne = (e) => {
    if (e.target.id) {
      handleChange(!change);
    }
  };

  return (
    <>
      {props.facility.map((facility, index) => {
        return (
          <>
            <Checkbox
              id={facility.id}
              label={facility.name}
              value={change}
              onChange={(e) => handleChangeOne()}
            />
          </>
        );
      })}
    </>
  );
};

export default Facility;
