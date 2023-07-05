import React, { useEffect, useState } from "react";
import FilteredData from "./_FilteredData";
import FilteredInput from "./_FilteredInput";
import userData from "./mockData/userData.json";

const FilterSearch = () => {
  const [filteredData, setFilteredData] = useState(userData);

  const handleFilter = (event) => {
    const value = event.target.value;
    if (value !== "") {
      const filtered = userData.filter((item) => {
        const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
        return fullName.includes(value.toLowerCase());
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(userData);
    }
  };

  return (
    <div>
      <FilteredInput onChange={handleFilter} />
      <FilteredData filteredData={filteredData} />
    </div>
  );
};

export default FilterSearch;
