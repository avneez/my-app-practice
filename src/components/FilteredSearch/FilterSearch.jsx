import React, { useEffect, useState } from "react";
import FilteredData from "./_FilteredData";
import FilteredInput from "./_FilteredInput";
import userData from "./mockData/userData.json";

const FilterSearch = () => {
  const [filteredData, setFilteredData] = useState(userData);

  const displaySortedData = userData.sort((a, b) =>
    a.first_name.localeCompare(b.first_name)
  );

  const handleFilter = (event) => {
    const value = event.target.value;
    if (value !== "") {
      const filteredStartsWith = [];
      const filteredContains = [];

      userData.forEach((item) => {
        const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
        if (fullName.startsWith(value.toLowerCase())) {
          filteredStartsWith.push(item);
        } else if (fullName.includes(value.toLowerCase())) {
          filteredContains.push(item);
        }
      });

      const filteredSortedData = [...filteredStartsWith, ...filteredContains];
      setFilteredData(filteredSortedData);
    } else {
      setFilteredData(displaySortedData);
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
