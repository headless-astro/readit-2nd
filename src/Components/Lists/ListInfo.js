import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchList } from "../../store/slices/singleListSlice";
import ListAPI from "../../api/ListAPI";
import Movie from "../Films/Movie";
import Pagination from "../Films/Pagination";
import AddMovieToListModal from "../Modals/addMovietoListModal";
import { fetchFavorites } from "../../store/slices/favoritesSlice";
import { fetchWatchlist } from "../../store/slices/watchlistSlice";

function ListInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const fetchedList = useSelector((state) => state.list.list);
  const fetchUserValue = useSelector((state) => state.user.user);
  const fetchedFavorites = useSelector((state) => state.favorites.favorites);
  const fetchedWatchlist = useSelector((state) => state.watchlist.watchlist);
  const [personalizedMovies, setPersonalizeMovies] = useState(null);
  const [current, setCurrent] = useState(null);
  const [movies, setMovies] = useState(null);
  const [modal, setModal] = useState(false);
  const listid = id.toString();

  useEffect(() => {
    dispatch(fetchList(listid))
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchFavorites())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchWatchlist())
      .unwrap()
      .then((result) => console.log("result: ", result))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    setPersonalizeMovies(
      PersonalizeMovies(movies, fetchedFavorites, fetchedWatchlist)
    );
  }, [movies, fetchedFavorites, fetchedWatchlist]);

  useEffect(() => {
    setCurrent(fetchedList);
    setMovies(fetchedList.movies);
  }, [fetchedList]);

  const PersonalizeMovies = (movies, favs, watchlist) => {
    if (movies == null || !Array.isArray(movies)) return null;
    if (favs == null || !Array.isArray(favs)) return null;
    if (watchlist == null || !Array.isArray(watchlist)) return null;

    let personalizedMovies = movies.slice();

    for (var i = 0; i < movies.length; i++) {
      var mov = movies[i];

      // check fav
      for (var y = 0; y < favs.length; y++) {
        var item = favs[y];

        if (mov.title === item.title) {
          personalizedMovies[i] = {
            ...personalizedMovies[i],
            isFavorite: true,
          };
        }
      }

      // check watchlist
      for (var y = 0; y < watchlist.length; y++) {
        var item = watchlist[y];

        if (mov.title === item.title) {
          personalizedMovies[i] = {
            ...personalizedMovies[i],
            inWatchlist: true,
          };
        }
      }
    }

    return personalizedMovies;
  };

  async function deleteList(listname) {
    const res = await ListAPI.deleteList(listname, fetchUserValue.uid);

    if (res.error) {
      alert(`error: ${res.error}`);
      return false;
    }

    window.location.href = "/lists";
    return true;
  }

  const addMovietoList = () => {
    setModal(!modal);
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-[#1f252c]  ">
      <div className=" w-full flex  h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      {current && (
        <div className="w-full">
          <div>
            <div className="w-full  bg-[#1b2228] flex flex-col sm:flex-row justify-center sm:justify-between items-center p-10">
              <div className="  flex flex-col sm:flex-row text-lg  text-[#899aa9] ">
                <div className="border-2 sm:mt-0 mt-4 border-[#232a31] flex text-center  sm:ml-4"></div>
              </div>

              <div className=" flex  items-center sm:mt-0 mt-4 ">
                {fetchUserValue && (
                  <div>
                    <button
                      className="m-1 p-2 bg-[#77818f] rounded-[0.3rem] text-xl"
                      onClick={() => deleteList(current.listname)}
                    >
                      Listeyi Sil
                    </button>
                    <button
                      className=" m-1 p-2 bg-[#77818f] rounded-[0.3rem] text-xl"
                      onClick={addMovietoList}
                    >
                      Film Ekle
                    </button>
                    {modal && (
                      <AddMovieToListModal
                        modal={modal}
                        listname={current.listname}
                        listid={current.uid}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <p className=" bg-[#1b2228] pl-16 text-xl text-[#63707d]  w-full border-b-2 border-[#445566] ">
              {current.listname.toUpperCase()}
            </p>
            <p className="  pl-16 sm:text-xl text-[#77818f] font-normal">
              {fetchUserValue.username} tarafından yaratıldı
            </p>
          </div>

          <div>
            {Array.isArray(personalizedMovies) &&
            personalizedMovies.length !== 0 ? (
              <div>
                <Pagination
                  data={personalizedMovies}
                  RenderComponent={Movie}
                  title="Movies"
                  pageLimit={5}
                  dataLimit={20}
                />
              </div>
            ) : (
              <div className="pl-[50rem] pt-[10rem] sm:text-xl min-h-[30rem] text-[#77818f]">
                Film yok
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListInfo;
