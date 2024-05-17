import React, { useEffect, useState } from "react";
import FilteredData from "./_FilteredData";
import FilteredInput from "./_FilteredInput";
import userData from "./mockData/userData.json";

const FilterSearch = () => {
  const [filteredData, setFilteredData] = useState(userData);

  const displaySortedData = userData.sort((a, b) =>
    a.first_name.localeCompare(b.first_name)
  );

  let debounceTimeout;

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase().trim();

    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      if (value !== "") {
        const filteredStartsWith = [];

        const searchWords = value.split(" ").filter(word => word !== "");
        userData.forEach((item) => {
          const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
          
          const matches = searchWords.every(word => fullName.includes(word));
          if (matches) {
            filteredStartsWith.push(item);
          }
        });

        setFilteredData(filteredStartsWith);
      } else {
        setFilteredData(displaySortedData);
      }
    }, 500);
  };

  return (
    <div>
      <FilteredInput onChange={handleFilter} />
      <FilteredData filteredData={filteredData} />
    </div>
  );
};

export default FilterSearch;
