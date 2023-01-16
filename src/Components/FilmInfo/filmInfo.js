import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavoriteMovie } from "../../store/slices/favoriteMovieSlice";
import { addWatchMovie } from "../../store/slices/forWatchList";
import { deleteWatchMovie } from "../../store/slices/forWatchList";
import { deleteFavoriteMovies } from "../../store/slices/favoriteMovieSlice";
import { fetchMovie } from "../../store/slices/singleMovieSlice";

function FilmInfo() {
  const dispatch = useDispatch();
  const { title } = useParams();
  const data = useSelector((state) => state.mert.data);
  const current = useSelector((state) => state.movie.movie);
  const fetchUserValue = useSelector((state) => state.user.user);
  const favorite = useSelector((state) => state.favorite.favoriteMovies);
  const watch = useSelector((state) => state.forwatch.watchMovies);
  const movieTitle = title.toString();
  console.log(movieTitle);
  useEffect(() => {
    dispatch(fetchMovie(movieTitle))
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  /*
  const addToFavoriteMovies = (element) => {
    favorite && favorite.find((x) => x.Id === element.Id)
      ? dispatch(deleteFavoriteMovies(element))
      : dispatch(addFavoriteMovie(element));
  };

  const addToForWatchMovies = (element) => {
    watch && watch.find((x) => x.Id === element.Id)
      ? dispatch(deleteWatchMovie(element))
      : dispatch(addWatchMovie(element));
  };

  {fetchUserValue && (
          <div className=" flex justify-center  w-1/2 sm:w-1/5 h-[30rem] pt-20">
            <div className=" flex justify-center gap-6 p-6 w-4/5 h-[6rem] rounded-lg bg-[#445566]">
              <button onClick={() => addToFavoriteMovies(selectedMovie)}>
                <img
                  className={` h-6 object-cover   rounded-2xl ${
                    favorite && favorite.find((x) => x.Id === selectedMovie.Id)
                      ? "bg-[#B12403]"
                      : "hover:bg-[#B12403]"
                  }  `}
                  src={require("../../images/popcorn.png")}
                />
              </button>
              <button onClick={() => addToForWatchMovies(selectedMovie)}>
                <img
                  className={` h-6 object-cover   rounded-2xl ${
                    watch && watch.find((x) => x.Id === selectedMovie.Id)
                      ? "bg-[#00b020]"
                      : "hover:bg-[#00b020]"
                  }  `}
                  src={require("../../images/eye.png")}
                />
              </button>
            </div>
          </div>
        )}
*/
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center bg-[#1f252c]  ">
      <div className=" w-full h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div className=" flex w-4/5 items-center sm:items-center flex-col sm:flex-row   h-full">
        {current && (
          <div
            className=" w-4/5  py-12 h-full  flex  flex-col sm:flex-row
        "
          >
            <div className="sm:w-1/3 w-full flex justify-center items-start">
              <img
                className="  w-[16rem]  h-[24rem] border-[#33394b] rounded-lg border-2  object-cover"
                src={require(`../../images/${current.title}.jpg`)}
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
                  {current.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilmInfo;
