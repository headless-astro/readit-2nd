import React, { useState, useEffect } from "react";
import Movie from "../Films/Movie";
import Pagination from "../Films/Pagination";
import { fetchWatchlist } from "../../store/slices/watchlistSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../../store/slices/favoritesSlice";

function Watchlist() {
  const fetchedFavorites = useSelector((state) => state.favorites.favorites);
  const fetchedWatchlist = useSelector((state) => state.watchlist.watchlist);
  const user = useSelector((state) => state.user.user);
  const [personalizedMovies, setPersonalizeMovies] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWatchlist())
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
  }, []);

  useEffect(() => {
    setPersonalizeMovies(PersonalizeMovies(fetchedFavorites, fetchedWatchlist));
  }, [fetchedFavorites, fetchedWatchlist]);

  const FilmName = (event) => {
    const title = event.toLowerCase();
    setPersonalizeMovies(
      fetchedWatchlist.filter((item) =>
        item.title.toLowerCase().includes(title)
      )
    );
  };

  const PersonalizeMovies = (favs, watchlist) => {
    if (favs == null || !Array.isArray(favs)) return null;
    if (watchlist == null || !Array.isArray(watchlist)) return null;

    let personalizedMovies = watchlist.slice();

    for (var i = 0; i < watchlist.length; i++) {
      var mov = watchlist[i];

      personalizedMovies[i] = {
        ...personalizedMovies[i],
        inWatchlist: true,
      };

      // check watchlist
      for (var y = 0; y < favs.length; y++) {
        var item = favs[y];

        if (mov.title === item.title) {
          personalizedMovies[i] = {
            ...personalizedMovies[i],
            isFavorite: true,
          };
        }
      }
    }

    return personalizedMovies;
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-[#1f252c]  ">
      <div className=" w-full flex  h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div className="w-full">
        <div className="w-full h-full bg-[#1b2228] flex flex-col sm:flex-row justify-center sm:justify-between items-center p-10">
          <div className="  flex flex-col sm:flex-row text-lg  text-[#899aa9] ">
            <div className="border-2 sm:mt-0 mt-4 border-[#232a31] flex text-center  sm:ml-4"></div>
          </div>
          <div className=" flex  items-center sm:mt-0 mt-4 ">
            <p className="flex flex-row pl-2 sm:text-lg font-sans  text-[#899aa9] ">
              FİLM ARA
            </p>
            <input
              onChange={(event) => FilmName(event.target.value)}
              className="w-[250px] sm:ml-5 h-[40px] ml-2 bg-[#2c3440] rounded-lg focus:bg-slate-100 pl-2"
            ></input>
          </div>
        </div>
        <p className=" bg-[#1b2228] pl-16 text-xl text-[#63707d] hover:text-[#613573] w-full border-b-2 border-[#445566] hover:border-[#613573]">
          İZLEME LİSTESİ{" "}
        </p>
      </div>
      {user ? (
        <div>
          {Array.isArray(personalizedMovies) &&
          personalizedMovies.length !== 0 ? (
            <div>
              <Pagination
                data={personalizedMovies}
                RenderComponent={Movie}
                title="Movies"
                pageLimit={5}
                dataLimit={18}
              />
            </div>
          ) : (
            <div className="min-h-[50rem]">No movies</div>
          )}
        </div>
      ) : (
        <div className=" pt-[10rem] min-h-[30rem] text-[#63707d] text-[1.5rem]">
          Listenizi görmek için giriş yapın
        </div>
      )}
    </div>
  );
}

export default Watchlist;
