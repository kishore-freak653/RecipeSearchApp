
const API_KEY = "2f0a8deb295b4b2c8ec837f38449fe90";

// Helper function to extract ingredients from Spoonacular response
const getIngredients = (recipe) => {
  if (!recipe.extendedIngredients) return [];

  return recipe.extendedIngredients.map((ing) =>
    `${ing.amount || ""} ${ing.unit || ""} ${ing.name || ""}`.trim()
  );
};

export const fetchRecipes = async (query) => {
  try {
    // First fetch basic recipe information
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=9&addRecipeInformation=true&fillIngredients=true`
    );
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return [];
    }

    // Map Spoonacular data to our app structure
    return data.results.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      instructions:
        recipe.instructions || recipe.summary || "No instructions available",
      area: recipe.cuisines?.length > 0 ? recipe.cuisines[0] : "Various",
      category:
        recipe.dishTypes?.length > 0 ? recipe.dishTypes[0] : "Main Course",
      ingredients: getIngredients(recipe),
      readyInMinutes: recipe.readyInMinutes || "N/A",
      servings: recipe.servings || "N/A",
      vegetarian: recipe.vegetarian || false,
      vegan: recipe.vegan || false,
      glutenFree: recipe.glutenFree || false,
      dairyFree: recipe.dairyFree || false,
      healthScore: recipe.healthScore || "N/A",
      sourceUrl: recipe.sourceUrl || "",
      summary: recipe.summary || "",
    }));
  } catch (error) {
    console.error("Spoonacular API error:", error);
    return [];
  }
};


export const getRecipeById = async (id) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`
    );
    const data = await response.json();

    return {
      id: data.id,
      title: data.title,
      image: data.image,
      instructions:
        data.instructions || data.summary || "No instructions available",
      area: data.cuisines?.length > 0 ? data.cuisines[0] : "Various",
      category: data.dishTypes?.length > 0 ? data.dishTypes[0] : "Main Course",
      ingredients: getIngredients(data),
      readyInMinutes: data.readyInMinutes || "N/A",
      servings: data.servings || "N/A",
      vegetarian: data.vegetarian || false,
      vegan: data.vegan || false,
      glutenFree: data.glutenFree || false,
      dairyFree: data.dairyFree || false,
      healthScore: data.healthScore || "N/A",
      sourceUrl: data.sourceUrl || "",
      summary: data.summary || "",
    };
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};