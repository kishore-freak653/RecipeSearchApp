import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/recipeSlice";
import { FaRegHeart, FaHeart, FaClock, FaUtensils } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const RecipeCard = () => {
  const { recipes, favorites, loading, error } = useSelector(
    (state) => state.recipes
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({}); // Store which ingredients are expanded

  const toggleFavorites = (recipe) => {
    const isFavorite = favorites.some((fav) => fav.id === recipe.id);
    isFavorite
      ? dispatch(removeFromFavorites(recipe))
      : dispatch(addToFavorites(recipe));
  };

  if (loading)
    return <p className="text-center py-8">Loading delicious recipes...</p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;
  if (!recipes || recipes.length === 0)
    return (
      <p className="text-center py-8">Search for recipes to get started!</p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative mt-2">
      {recipes.map((recipe) => {
        const uniqueId = recipe.id;
        const isFavorite = favorites.some((fav) => fav.id === recipe.id);

        return (
          <div
            key={uniqueId}
            className="border mt-2 p-6 rounded-lg shadow-md bg-white relative"
          >
            {/* Title and tags */}
            <h1 className="text-xl font-serif pr-10">{recipe.title}</h1>

            {/* Cuisine and meal type */}
            <div className="flex flex-wrap gap-2 mt-1 text-xs">
              {recipe.area && (
                <span className="bg-blue-100 px-2 py-1 rounded-full">
                  {recipe.area}
                </span>
              )}
              {recipe.category && (
                <span className="bg-green-100 px-2 py-1 rounded-full">
                  {recipe.category}
                </span>
              )}
              {recipe.vegetarian && (
                <span className="bg-green-200 px-2 py-1 rounded-full">
                  Vegetarian
                </span>
              )}
            </div>

            {/* Recipe image */}
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover mt-3 rounded-lg"
              />
            )}

            {/* Quick stats */}
            <div className="flex justify-between mt-3 text-sm text-gray-700">
              <div className="flex items-center">
                <FaClock className="mr-1" />
                <span>{recipe.readyInMinutes} min</span>
              </div>
              <div className="flex items-center">
                <FaUtensils className="mr-1" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center">
                <GiMeal className="mr-1" />
                <span>Health: {recipe.healthScore}/100</span>
              </div>
            </div>

            {/* Ingredients */}
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold">Ingredients:</h3>
                <ul className="list-disc pl-5 mt-1 text-sm">
                  {expanded[uniqueId]
                    ? recipe.ingredients.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))
                    : recipe.ingredients
                        .slice(0, 3)
                        .map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
                {recipe.ingredients.length > 3 && (
                  <button
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [uniqueId]: !prev[uniqueId],
                      }))
                    }
                    className="text-blue-500 text-xs mt-1 cursor-pointer"
                  >
                    {expanded[uniqueId]
                      ? "Show Less"
                      : `Show All (${recipe.ingredients.length})`}
                  </button>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex mt-4">
              <button
                onClick={() => navigate("/recipes", { state: { recipe } })}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm flex-grow"
              >
                View Full Recipe
              </button>
            </div>

            {/* Favorite button */}
            <button
              className={`p-2 rounded-full absolute top-2 right-2 ${
                isFavorite ? "text-red-500" : "text-gray-400"
              }`}
              onClick={() => toggleFavorites(recipe)}
            >
              {isFavorite ? (
                <FaHeart className="text-lg" />
              ) : (
                <FaRegHeart className="text-lg" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeCard;
