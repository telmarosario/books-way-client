import { useState } from "react";

function SearchBar({ searchFilter }) {
  const [search, setSearch] = useState("");

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    searchFilter(e.target.value);
  };

  return (
    <input
      class="form-control w-50 me-4"
      type="text"
      placeholder="Search for a book"
      onChange={handleSearchInput}
    />
  );
}

export default SearchBar;
