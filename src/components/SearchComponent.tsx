import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchComponent: React.FC<{
  onSearchChange: (filterValue: string) => void;
}> = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        // margin: "20px 0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "5px",
        flexGrow: "1",
      }}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          onSearchChange(e.target.value);
        }}
        placeholder="Search products..."
        style={{
          marginRight: "10px",
          padding: "5px",
          color: "#886863",
          border: "none",
          outline: "none",
          flex: "1",
        }}
      />
      <FaSearch
        style={{
          marginLeft: "30px",
          position: "relative",
          top: "2px",
          color: "#886863",
        }}
      />
    </div>
  );
};
