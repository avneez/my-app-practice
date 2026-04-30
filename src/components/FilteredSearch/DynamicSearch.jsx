import { useState, useMemo, useCallback } from "react";
import { debounce } from "lodash"; // npm install lodash

const items = ["Apple", "App", "Application", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"];

const DynamicSearch = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // 1. Debounce the state update using useCallback
  const debouncedSetQuery = useCallback(
    debounce((value) => {
      setDebouncedQuery(value);
    }, 300),
    [],
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Immediate UI update
    debouncedSetQuery(value); // Delayed update for filtering
  };

  // 2. Memoize the filtered list based on the debounced query
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  }, [debouncedQuery, items]);

  return (
    <div>
      <h2>Dynamic Search</h2>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicSearch;
