import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateModal from "../Modals/CreateModal";
import RegisterModal from "../Modals/RegisterModal";
import { fetchUser } from "../../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import AuthAPI from "../../api/AuthAPI";

function NavnarMain() {
  const fetchUserValue = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const isLoginFunction = () => {
    {
      if (fetchUserValue) {
        dispatch(fetchUser(false));
        localStorage.removeItem("fetchUser");
        AuthAPI.logout();
      } else {
        setLoginModal(!loginModal);
      }
    }
  };

  const isRegisterFunction = () => {
    {
      setRegisterModal(!registerModal);
    }
  };

  return (
    <div className="w-full h-[92px] flex flex-col  sm:flex-row absolute z-10 justify-center  sm:justify-between  items-center  ">
      <Link to="/">
        <img
          className=" sm:ml-10 lg:w-[5rem] h-[5rem]  object-fill "
          src={require("../../../src/images/movie.png")}
        />
      </Link>
      <div className="text-[#d8e0e8] font-bold gap-4 sm:gap-0  flex flex-row justify-center  items-center sm:pr-12 h-full">
        {fetchUserValue && (
          <Link to="/profile" className="hover:text-[#fefefe] sm:ml-6">
            PROFİL
          </Link>
        )}
        <Link className="hover:text-[#fefefe] sm:ml-6" to="/films">
          FİLMLER
        </Link>
        <Link className="hover:text-[#fefefe] sm:ml-6" to="/lists">
          LİSTELER
        </Link>
        <Link className="hover:text-[#fefefe] sm:ml-6" to="/favoritemovies">
          FAVORİLER
        </Link>
        <Link className="hover:text-[#fefefe] sm:ml-6" to="/Watchlist">
          İZLEME LİSTESİ
        </Link>
        <button
          onClick={isLoginFunction}
          className="hover:text-[#fefefe]  sm:ml-6"
        >
          {fetchUserValue ? "ÇIKIŞ YAP" : "GİRİŞ YAP"}
        </button>
        {loginModal && <CreateModal modal={loginModal} />}
        {!fetchUserValue && (
          <button
            onClick={isRegisterFunction}
            className="hover:text-[#fefefe]  sm:ml-6"
          >
            ÜYE OL
          </button>
        )}
        {registerModal && <RegisterModal modal={registerModal} />}
      </div>
    </div>
  );
}

export default NavnarMain;
