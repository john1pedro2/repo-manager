import React, { useState } from "react";

const Search = ({ onSearch, onClearSearch }) =>{
  const [query, setQuery] = useState("");

  const handleClear = () => {
    setQuery('');
    onClearSearch();
  }

  return(
    <div className="search">
      <label htmlFor="query">Procurar:</label>
      <input 
      type="text" 
      name="query" 
      id="query" 
      value={query}
      onChange={(e) => setQuery(e.target.value)}/>
      <button onClick={handleClear}>Limpar</button>
      <button onClick={() => onSearch(query)}>Procurar</button>
    </div>
  );
}

export default Search
