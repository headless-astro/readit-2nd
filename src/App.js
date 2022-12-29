import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavnarMain from "./Components/Navbar/NavnarMain";
import Footer from "./Components/Footer/Footer";
import CreateModal from "./Components/Modals/CreateModal";
import { isLogin } from "./store/slices/loginSlice";
import { addFavoriteMovie } from "./store/slices/favoriteMovieSlice";

import Pages from "./Pages";
function App() {
  const dispatch = useDispatch();
  const isUserLogin = localStorage.getItem("isLogin");
  const favoritesFromLocalStorage = localStorage.getItem("favoriteMovies");

  useEffect(() => {
    if (isUserLogin) {
      dispatch(isLogin(true));
    }
  }, [isUserLogin]);

  return (
    <div>
      <NavnarMain />
      <Pages />
      <Footer />
      <CreateModal />
    </div>
  );
}

export default App;
