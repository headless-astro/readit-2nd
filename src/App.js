import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavnarMain from "./Components/Navbar/NavnarMain";
import Footer from "./Components/Footer/Footer";
import CreateModal from "./Components/Modals/CreateModal";
import { fetchUser } from "./store/slices/userSlice";
import { addFavoriteMovie } from "./store/slices/favoriteMovieSlice";

import Pages from "./Pages";
function App() {
  const dispatch = useDispatch();
  const favoritesFromLocalStorage = localStorage.getItem("favoriteMovies");

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

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
