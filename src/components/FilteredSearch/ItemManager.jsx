import { useState, useMemo, useCallback } from "react";

// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const ItemManager = () => {
  const [items, setItems] = useState(["Apple", "Banana", "Mango"]);
  const [newItem, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounced function to update search term
  const debouncedSetSearchTerm = useCallback(
    debounce(setDebouncedSearchTerm, 500),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Immediate UI update
    debouncedSetSearchTerm(value); // Delayed update for filtering
  };

  // Memoize filtered items - only recalculates when items or debouncedSearchTerm changes
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
  }, [items, debouncedSearchTerm]);

  // Memoize addItem - only recreated when items or newItem changes
  const addItem = useCallback(() => {
    if (newItem.trim() !== "") {
      setItems((prevItems) => [...prevItems, newItem]);
      setNewItem("");
    }
  }, [newItem]);

  // Memoize deleteItem - stable reference across renders
  const deleteItem = useCallback((indexToDelete) => {
    setItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToDelete),
    );
  }, []);

  return (
    <div
      style={{ padding: "20px", maxWidth: "400px", fontFamily: "sans-serif" }}
    >
      <h2>Item List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      {/* Add Item Input */}
      <div style={{ display: "flex", gap: "5px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Add new item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={{ flexGrow: 1, padding: "8px" }}
        />
        <button
          onClick={addItem}
          style={{ padding: "8px 12px", cursor: "pointer" }}
        >
          Add
        </button>
      </div>

      {/* List Display */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              {item}
              <button
                onClick={() => deleteItem(index)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p style={{ color: "#888" }}>No items found.</p>
        )}
      </ul>
    </div>
  );
};

export default ItemManager;
