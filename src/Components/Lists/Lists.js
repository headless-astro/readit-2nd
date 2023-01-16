import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListAPI from "../../api/ListAPI";

function Lists() {
  const data = useSelector((state) => state.mert.data);
  const fetchUserValue = useSelector((state) => state.user.user);
  const favorite = useSelector((state) => state.favorite.favoriteMovies);
  const watch = useSelector((state) => state.forwatch.watchMovies);
  const userid = useSelector((state) => state.user.user.uid);
  const lists = [];
  const listNames = [];
  getAllLists();

  async function getAllLists() {
    const result = await ListAPI.getAllLists(userid);

    for (var i = 0; i < result.data.data.length; i++) {
      lists.push(result.data.data[i]);
      listNames.push(result.data.data[i].list_name);
    }
  }

  console.log(lists);
  // Some styling for the items
  const styles = {
    backgroundColor: "white",
    width: "50px",
    marginBottom: "10px",
    padding: "10px",
    color: "green",
    boxShadow: "rgb(0,0,0,0.44) 0px 5px 5px",
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-[#1f252c]  ">
      <div className=" w-full flex  h-[102px] sm:h-[92px] bg-[#14181c]"></div>
      <div className="w-4/5 h-full  flex flex-row sm:flex-row justify-center items-center text-center  pt-10 pb-10 bg-[#1f252c]  ">
        <div className="flex flex-col w-4/5 text-[#63707d] justify-center text-2xl mt-11 border-b-2 hover:text-[#613573] hover:border-[#613573] border-[#445566]">
          <p>LISTELER</p>
        </div>
        <div className="flex flex-col sm:ml-32 justify-center w-32 text-center  border-r-2  border-[#232d38]">
          <p className=" mb-4 pt-2  font-bold text-2xl text-[#fffffe]">
            {favorite.length}
          </p>
          <p className="  h-full font-bold  text-[#fffffe] text-s font-sans opacity-60 hover:text-[#613573] hover:opacity-80">
            LISTE
          </p>
        </div>
        <div className="flex flex-col  justify-center w-32 text-center ">
          <button className="  h-full font-bold text-5xl text-[#fffffe] text-s font-sans opacity-60 hover:text-[#613573] hover:opacity-80">
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lists;
