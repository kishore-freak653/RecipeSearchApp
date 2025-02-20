import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { fetchRecipes} from "../Services/Api"

//Async action to fetch recipes 
export const getRecipes = createAsyncThunk("recipes/getRecipes",async(query)=>{
  const data = await fetchRecipes(query);
  return data;
})  


const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    loading: false,
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (recipe) => recipe.title !== action.payload.title
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecipes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.recipes = action.payload;
    });
    builder.addCase(getRecipes.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to fetch recipes";
    });
  },
});
export const  {addToFavorites, removeFromFavorites} = recipeSlice.actions;
export default recipeSlice.reducer;