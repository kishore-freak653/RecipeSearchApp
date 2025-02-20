import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DisplayRecipes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe; // Get recipe data from navigation

  if (!recipe) {
    return <p>No Recipe Found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button onClick={() => navigate(-1)} className="text-blue-500 mb-4">
        ← Back
      </button>
      <h1 className="text-3xl font-serif font-semibold">{recipe.title}</h1>
      <div className="flex gap-2 mt-1 text-sm text-gray-600">
        {recipe.area && <span> {recipe.area}</span>}
        {recipe.category && <span> {recipe.category}</span>}
      </div>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-60 object-cover mt-2 rounded-lg"
        />
      )}

      <div className="mt-3">
        <h3 className="text-xl font-semibold mt-1">Ingredients</h3>
        <ul className="list-disc pl-5 mt-1">
          {recipe.ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <h3 className="text-xl font-semibold mt-1">Instructions</h3>
        <p className="mt-1">{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default DisplayRecipes;
