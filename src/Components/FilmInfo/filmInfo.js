import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovie } from "../../store/slices/singleMovieSlice";
import { useState } from "react";
import favoritesAPI from "../../api/favoritesAPI";
import watchlistAPI from "../../api/watchlistAPI";
import AddToListModal from "../Modals/addToListModal";
import { fetchFavorites } from "../../store/slices/favoritesSlice";
import { fetchWatchlist } from "../../store/slices/watchlistSlice";
import "../../css/moviePage.css";

function FilmInfo() {
  const dispatch = useDispatch();
  const { title } = useParams();
  const current = useSelector((state) => state.movie.movie);
  const fetchUserValue = useSelector((state) => state.user.user);
  const [addMovieModal, setAddMovieModal] = useState(false);
  const movieTitle = title.toString();
  var favorites = useSelector((state) => state.favorites.favorites);
  var watchlist = useSelector((state) => state.watchlist.watchlist);
  var isFavorite = false;
  var inWatchlist = false;
  var favTitles = [];
  var watchTitles = [];
  //problem with buttons displaying wrong, work on it isfavorite/inwatchlist
  if (fetchUserValue) {
    favorites.forEach((element) => {
      favTitles.push(element.title);
    });
    if (favTitles.includes(title)) {
      isFavorite = true;
    }
    watchlist.forEach((element) => {
      watchTitles.push(element.title);
      if (title === element.title) {
        inWatchlist = true;
      }
    });
  }
  const addToFavoriteMovies = () => {
    if (favTitles && favTitles.includes(title)) {
      favoritesAPI.deleteFavorite(title, fetchUserValue.uid);
      favTitles = favTitles.filter((name) => name !== title);
    } else {
      favoritesAPI.addFavorite(title, fetchUserValue.uid);
      favTitles = [...favTitles, title];
    }
    dispatch(fetchFavorites());
  };

  const addToWatchlist = () => {
    if (watchTitles && watchTitles.includes(title)) {
      watchlistAPI.deleteFromWatchlist(title, fetchUserValue.uid);
      watchTitles = watchTitles.filter((name) => name !== title);
    } else {
      watchlistAPI.addToWatchlist(title, fetchUserValue.uid);
      watchTitles = [...watchTitles, title];
    }
    dispatch(fetchWatchlist());
  };

  useEffect(() => {
    dispatch(fetchMovie(movieTitle))
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    dispatch(fetchFavorites())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    dispatch(fetchWatchlist())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //to test, fix to get listname, warn if its already in selected list
  const addToList = () => {
    {
      setAddMovieModal(!addMovieModal);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center bg-[#1f252c]  ">
      <div className=" w-full h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div className=" flex w-4/5 items-center sm:items-center flex-col sm:flex-row   h-full">
        {current && (
          <div
            className="cont
        "
          >
            <div className="sm:w-1/3 w-full flex justify-center items-start">
              <img
                className="  w-[18rem]  h-[26rem] border-[#33394b] rounded-lg border-2  object-cover"
                src={
                  current.posterUrl ? current.posterUrl : "../images/heart.png"
                }
              />
            </div>
            <div className="w-full sm:w-2/3  flex flex-col justify-start items-center ">
              <div className="flex flex-col justify-center text-center items-center  w-full  mt-6 sm:ml-6 ">
                <p className="text-white w-6/7 font-bold text-2xl font-serif">
                  {current.title.toUpperCase()}
                </p>
                <div className="flex w-full gap-2 justify-center text-center items-center">
                  <p className="  pt-2 sm:text-xl text-[#77818f]   font-normal">
                    {current.year}
                  </p>
                  <p className="  pt-2 sm:text-xl text-[#77818f] font-normal">
                    Directed by {current.director}
                  </p>
                </div>
                <p className="w-4/5  file: mt-6 text-lg text-[#8ba6a0]">
                  {current.plot}
                </p>
              </div>
            </div>
            {fetchUserValue && (
              <div className="bttn">
                <div className="bttnUpper">
                  <button className="btUpper" onClick={addToFavoriteMovies}>
                    Favori
                  </button>
                  <button className="btUpper" onClick={addToWatchlist}>
                    Izleme Listesi
                  </button>
                </div>
                <div>
                  <button className="btBottom" onClick={addToList}>
                    Listeye ekle
                  </button>
                  <button className="btBottom">Filler</button>
                  <button className="btBottom">Filler</button>
                  <button className="btBottom">Filler</button>
                </div>
                {addMovieModal && (
                  <AddToListModal modal={addMovieModal} title={current.title} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilmInfo;
