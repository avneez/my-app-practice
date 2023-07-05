import React from "react";

const FilteredInput = (props) => {
  const { onChange, value } = props;

  return (
    <>
      <input placeholder="Search" onChange={onChange} value={value} />
    </>
  );
};

export default FilteredInput;
