import React from "react";

const FilteredInput = (props) => {
  const { onChange } = props;

  return (
    <>
      <input placeholder="Search" onChange={onChange} />
    </>
  );
};

export default FilteredInput;
