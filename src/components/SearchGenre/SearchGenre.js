import { useState } from "react";
import genres from "../../genres";

function SearchGenre({ filterGenre }) {
  const [bookGenre, setBookGenre] = useState("All");

  const handleSelect = (e) => {
    setBookGenre(e.target.value);
    filterGenre(e.target.value);
  };

  return (
    <div>
      <select
        value={bookGenre}
        onChange={handleSelect}
        className="form-control dropdown w-auto"
      >
        <option value="All"> All genres</option>
        {genres.map((oneGenre) => {
          return <option value={oneGenre}>{oneGenre}</option>;
        })}
      </select>
    </div>
  );
}
export default SearchGenre;
