import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer/Reducer";
import {
  SELECT_USERS,
  SET_ALL_TASK,
  TASK_LOADING,
  TASK_LOADING_SUCCESS,
} from "./actions";
import { TaskURL, URL } from "./helper/data";
import { toast } from "react-toastify";

const GlobalContext = createContext();

// C-Hook
export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  // console.log(import.meta.env.VITE_COMPANY_ID);

  // initial state
  const initialState = {
    users: [],
    task: {
      assigned_user: "",
      task_date: "2023-12-01",
      task_time: 0,
      is_completed: false,
      task_msg: "",
      time_zone: "",
    },
    allTask: [],
    task_loading: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // set select options users
  const setSelectUsers = (users) => {
    dispatch({ type: SELECT_USERS, payload: users });
  };
  // set All task
  const setAllTask = (task) => {
    dispatch({ type: SET_ALL_TASK, payload: task });
  };

  // const getAll task from API
  const getAllTask = async () => {
    dispatch({ type: TASK_LOADING });
    try {
      const { data } = await axios(TaskURL(), {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const task = data.results;
      dispatch({ type: TASK_LOADING_SUCCESS });
      setAllTask(task);
    } catch (error) {
      console.log(error.message);
    }
  };

  // fetch select options
  async function fetchSelectUsers() {
    try {
      const { data } = await axios.get(
        `https://stage.api.sloovi.com/team?product=outreach&company_id=${
          import.meta.env.VITE_COMPANY_ID
        }`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          },
        }
      );
      const users = data.results.data;
      setSelectUsers(users);
    } catch (error) {
      console.log(error.message);
    }
  }

  // createTask
  const createTask = async (body) => {
    // console.log(body);
    try {
      await axios.post(TaskURL(), body, {
        headers: {
          Authorization: `Bearer  ${import.meta.env.VITE_ACCESS_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // console.log(res);
      toast.success("Task Created");
      getAllTask();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // update existing task
  const updateTask = async (id, body) => {
    try {
      await axios.put(URL(id), body, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // console.log(res);
      toast.success("Task Updated");
      getAllTask();
    } catch (error) {
      console.log(error.message);
      toast.error("error.message");
    }
  };

  // delete task
  const deleteTask = async (id) => {
    let deleteConfirm = confirm("Are you sure you want to delete this Task?");
    if (!deleteConfirm) return;
    try {
      await axios.delete(URL(id), {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      getAllTask();
      // console.log(res);
      toast.success("Task Deleted");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Getting Access Token, Company_id, User_id
  const fetchdataapi = async () => {
    const { data } = await axios.post(
      "https://stage.api.sloovi.com/login?product=outreach",
      {
        email: "smithwills1989@gmail.com",
        password: '12345678',
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
  };

  useEffect(() => {
    fetchSelectUsers();
    console.log(import.meta.env.VITE_COMPANY_ID);
    getAllTask();
    // fetchdataapi()
  }, []);
  return (
    <GlobalContext.Provider
      value={{ ...state, createTask, updateTask, deleteTask }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default AppContext;
