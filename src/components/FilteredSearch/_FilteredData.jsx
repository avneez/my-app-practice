import React from "react";

const FilteredData = ({ filteredData }) => {
  const sortedData = filteredData.sort((a, b) =>
    a.first_name.localeCompare(b.first_name)
  );

  return (
    <>
      {sortedData.map((item) => {
        return <h3 key={item.id}>{`${item.first_name} ${item.last_name}`}</h3>;
      })}
    </>
  );
};

export default FilteredData;
