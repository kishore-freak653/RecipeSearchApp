import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../redux/recipeSlice";
import { CgRemove } from "react-icons/cg";

const Favourites = () => {
  const { favorites } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState({});

  const toggleShowMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFavorites = (recipe) => {
      const isFavorite = favorites.some((fav) => fav.title === recipe.title);
      isFavorite
        ? dispatch(removeFromFavorites(recipe))
        : dispatch(addToFavorites(recipe));
    };

  return (
    <>
      <h1 className="text-3xl font-bold  font-serif">My Favourites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-serif">
        {favorites.map((recipe, index) => (
          <div
            key={index}
            className="relative border mt-2 p-4 rounded-lg shadow-md bg-white"
          >
            {/* Remove Icon on Top-Right */}
            <button 
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
              onClick={() => dispatch(toggleFavorites(recipe))}
            >
              <CgRemove size={18} />
            </button>

            <h2>{recipe.title}</h2>
            <div className="flex gap-2 mt-1 text-sm text-gray-600">
              {recipe.area && <span> {recipe.area}</span>}
              {recipe.category && <span> {recipe.category}</span>}
            </div>

            {recipe.image && (
              <img
                src={recipe.image}
                className="w-full h-48 object-cover mt-2 rounded-lg"
              />
            )}

            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div>
                <h3>Ingredients:</h3>
                <ul className="list-disc pl-5 mt-1">
                  {recipe.ingredients.map((items, idx) => (
                    <li key={idx}>{items}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-3">
              <h3 className="underline mt-1">Instructions</h3>
              <p className="text-sm mt-1">
                {!expanded[recipe.id]
                  ? `${recipe.instructions?.substring(0, 100)}...`
                  : recipe.instructions}
              </p>
              <button
                onClick={() => toggleShowMore(recipe.id)}
                className="text-blue-500 mt-2 cursor-pointer"
              >
                {expanded[recipe.id] ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourites;
