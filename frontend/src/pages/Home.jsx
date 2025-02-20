import React from "react";
import RecipeSearchBar from "../components/RecipeSearchBar";
import RecipeCard from "../components/RecipeCard";
import logo from "../assets/icons8-recipe-book-78.png"

const Home = () => {
  return (
    <>
      <div>
        <div className="flex justify-center">
          <h1 className="text-4xl text-center font-bold font-serif">
            Welcome to RecipeVerse{" "}
          </h1>
          <img src={logo} alt="RecipeVerse Logo" className="-mt-5" />
        </div>

        <p className="text-center font-serif">
          Your one stop for all the best recipes
        </p>
      </div>

      <div>
        <RecipeSearchBar />
      </div>
      <h1 className="text-3xl  font-semibold font-serif ">
        Recommended Recipes
      </h1>
     

      {/* Recipe Cards */}
      <div>
        <RecipeCard />
      </div>
    </>
  );
};

export default Home;
