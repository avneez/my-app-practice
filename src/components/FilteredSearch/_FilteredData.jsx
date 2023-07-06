import React from "react";

const FilteredData = ({ filteredData }) => {

  return (
    <>
      {filteredData.map((item) => {
        return <h3 key={item.id}>{`${item.first_name} ${item.last_name}`}</h3>;
      })}
    </>
  );
};

export default FilteredData;
