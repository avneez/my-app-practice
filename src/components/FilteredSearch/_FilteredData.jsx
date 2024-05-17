import React, { useState } from "react";

const FilteredData = ({ filteredData }) => {
  const [showNames, setShowNames ] = useState(false)

  const toggleNames = () => {
    setShowNames(prev => !prev);
  };
  
  return (
    <>
    <div>
      <button onClick={toggleNames}>{showNames ? 'Hide' : 'Show'}</button>
    </div>
      {showNames ? filteredData.map((item) => {
        return <h3 key={item.id}>{`${item.first_name} ${item.last_name}`}</h3>;
      })
      :
      <></>
      }
    </>
  );
};

export default FilteredData;
