import api from "./api";
import errors from "./errors";
import { useSelector } from "react-redux";

const createList = async (userid, listname) => {
  try {
    const res = await api.post("lists/create-list", {
      userid,
      listname,
    });
    console.log(res.data);

    return { error: false };
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const deleteList = async (listname, userid) => {
  try {
    const res = await api.post("lists/create-list", {
      listname,
      userid,
    });
    console.log(res.data);

    return { error: false };
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const getAllLists = async (userid) => {
  try {
    const res = await api.post(`lists/all-lists`, { userid });
    console.log(res.data);

    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const currentList = async (listname, userid) => {
  try {
    const res = await api.post("lists/list-current", { listname, userid });

    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const addMovie = async (listname, userid, title) => {
  try {
    const res = await api.post("lists/add-movie", {
      listname,
      userid,
      title,
    });

    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const removeMovie = async (listname, userid, title) => {
  try {
    const res = await api.post("lists/remove-movie", {
      listname,
      userid,
      title,
    });

    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

export default {
  currentList,
  getAllLists,
  createList,
  deleteList,
  addMovie,
  removeMovie,
};
