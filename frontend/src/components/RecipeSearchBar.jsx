import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipes } from "../redux/recipeSlice";

const RecipeSearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (query.trim() !== "") {
      dispatch(getRecipes(query));
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <input
        type="text"
        placeholder="Search for recipes..."
        className="border rounded-lg p-2 w-72"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default RecipeSearchBar;
