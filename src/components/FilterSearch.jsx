import React, { useEffect, useState } from "react";
import userData from "../mockData/userData.json";

const FilterSearch = () => {
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState(userData);

  useEffect(() => {
    if (value !== "") {
      const data = [];
      const res = userData.filter((item) => {
        if (item.first_name.toLowerCase().startsWith(value)) {
          data.push(item);
          console.log(item.first_name.toLowerCase());
          return data;
        }
      });
      setFilteredData(data);
    } else {
      setFilteredData(userData);
    }
  }, [value]);

  return (
    <div>
      <input placeholder="Search" onChange={(e) => setValue(e.target.value)} />
      {console.log("fdd", filteredData)}
      {filteredData.map((item) => {
        return (
          <h3
            key={item.id}
            style={{ color: "red" }}
          >{`${item.first_name} ${item.last_name}`}</h3>
        );
      })}
    </div>
  );
};

export default FilterSearch;
