
import {Routes,Route,Outlet, BrowserRouter} from "react-router-dom"
;
import './App.css'
import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import DisplayRecipes from "./pages/DisplayRecipes";



function App() {


  return (
    <>
     
       <BrowserRouter >
       <Layout>
        <Routes>
          {/* <Route path="/" element={<Home />}></Route> */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorites" element={<Favourites />}></Route>
          <Route path="/recipes" element={<DisplayRecipes />}></Route>
        </Routes>
       </Layout>
       </BrowserRouter>
      
    </>
  );
}

export default App
