import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchList } from "../../store/slices/singleListSlice";
import { Link } from "react-router-dom";
import ListAPI from "../../api/ListAPI";
import { addFavoriteMovie } from "../../store/slices/favoriteMovieSlice";
import { addWatchMovie } from "../../store/slices/forWatchList";
import { deleteWatchMovie } from "../../store/slices/forWatchList";
import { deleteFavoriteMovies } from "../../store/slices/favoriteMovieSlice";

function ListInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movies = useSelector((state) => state.lists.lists.movies);
  const current = useSelector((state) => state.list.list);
  const fetchUserValue = useSelector((state) => state.user.user);
  const favorite = useSelector((state) => state.favorite.favoriteMovies);
  const watch = useSelector((state) => state.forwatch.watchMovies);
  const listid = id.toString();

  useEffect(() => {
    dispatch(fetchList(listid))
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  /* const addToFavoriteMovies = (element) => {
    favorite && favorite.find((x) => x.Id === element.Id)
      ? dispatch(deleteFavoriteMovies(element))
      : dispatch(addFavoriteMovie(element));
  };

  const addToForWatchMovies = (element) => {
    watch && watch.find((x) => x.Id === element.Id)
      ? dispatch(deleteWatchMovie(element))
      : dispatch(addWatchMovie(element));
  };
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
                src={require(`../../images/${current.movies[0]}.jpg`)}
              />
            </div>
            <div className="w-full sm:w-2/3  flex flex-col justify-start items-center ">
              <div className="flex flex-col justify-center text-center items-center  w-full  mt-6 sm:ml-6 ">
                <p className="text-white w-6/7 font-bold text-2xl font-serif">
                  {current.listname.toUpperCase()}
                </p>
                <div className="flex w-full gap-2 justify-center text-center items-center">
                  <p className="  pt-2 sm:text-xl text-[#77818f]   font-normal">
                    te
                  </p>
                  <p className="  pt-2 sm:text-xl text-[#77818f] font-normal">
                    Directed by {fetchUserValue.username}
                  </p>
                </div>
                <p className="w-4/5  file: mt-6 text-lg text-[#8ba6a0]">
                  {current.movies}
                </p>
              </div>
              <div>
                {Array.isArray(current.movies) &&
                current.movies.length !== 0 ? (
                  <div className="w-4/5 h-full mt-16  mb-16  grid grid-cols-2 sm:grid-cols-5 justify-center items-center ">
                    {current.movies.map((movie) => (
                      <div
                        key={movie}
                        className="h-[16rem] xl:h-[18rem]  rounded-3xl mx-7 my-2 flex  flex-row justify-center group  "
                      >
                        <Link
                          className="absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem]  hover:text-[#613573]"
                          to={"/"}
                        >
                          <div className="">
                            <img
                              className=" absolute w-[9rem] h-[13rem] sm:w-[11rem]  sm:h-[16rem] xl:w-[13rem] xl:h-[18rem] border-2 border-[#1b2228] hover:border-[#613573] rounded-3xl object-cover"
                              src={require(`../../images/${movie}.jpg`)}
                            />
                            <div>{movie}</div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No movies</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListInfo;
