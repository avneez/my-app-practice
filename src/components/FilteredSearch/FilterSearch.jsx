import React, { useEffect, useState } from "react";
import FilteredData from "./FilteredData";
import userData from "./mockData/userData.json";

const FilterSearch = () => {
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState(userData);

  useEffect(() => {
    if (value !== "") {
      const filtered = userData.filter((item) => {
        const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
        return fullName.includes(value.toLowerCase());
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(userData);
    }
  }, [value]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input placeholder="Search" onChange={onChange} value={value} />
      <FilteredData filteredData={filteredData} />
    </div>
  );
};

export default FilterSearch;
