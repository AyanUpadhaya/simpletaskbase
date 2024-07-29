import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import {
  deleteTask,
  getUserTasks,
  updateTask,
} from "../firebase/functions/firebasedb.functions";
import { ErrorNotify, InfoNotify } from "../utils/getNotify";
import TasksTable from "../components/tables/TasksTable";
import AddTaskModal from "../components/modals/AddTaskModal";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAscending, setIsAscending] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setsearchTerm] = useState("");

  const extractInformations = (snapshots) => {
    const tasks = [];
    snapshots.forEach((doc) => {
      tasks.push({ ...doc.data(), id: doc.id });
    });
    setAllTasks(tasks);
    setLoading(false);
  };
  useEffect(() => {
    if (user?.uid) {
      setLoading(true);
      const unsubscribe = getUserTasks(user.uid, (querySnapshot) => {
        extractInformations(querySnapshot);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
    } catch (error) {
      ErrorNotify(error.message);
    }
  };

  const handleTaskCompleted = async (id, task) => {
    try {
      await updateTask(id, { is_completed: !task.is_completed });
    } catch (error) {
      ErrorNotify(error.message);
    }
  };

  //sort by timestamp
  const sortByTime = (a, b) => {
    if (isAscending) {
      return a.timestamp - b.timestamp;
    } else {
      return b.timestamp - a.timestamp;
    }
  };

  //search filter

  const filterBySearch = (data, searchValue) => {
    if (searchValue.trim().length > 0) {
      return data?.title?.toLowerCase().startsWith(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };

  //filter completed

  const filterByOptions = (data, searchTerm) => {
    if (searchTerm == "completed") {
      return data?.is_completed == true;
    }
    if (searchTerm == "pending") {
      return data?.is_completed == false;
    }
    if (searchTerm == "all") {
      return data
    }
    if (searchTerm == "high") {
       return data?.priority == "1";
    }
    if (searchTerm == "mid") {
       return data?.priority == "2";
    }
    if (searchTerm == "low") {
       return data?.priority == "3";
    }
    if (searchTerm == "") {
      return data
    }
  };

  const newData =
    [...allTasks]
      ?.sort(sortByTime)
      ?.filter((item) => filterBySearch(item, searchValue))
      ?.filter((item) => filterByOptions(item, searchTerm)) || [];

  if (loading) {
    return (
      <div>
        <h3>Loading....</h3>
      </div>
    );
  }

  if (allTasks.length == 0) {
    return (
      <div className="d-flex flex-column align-items-center">
        <h4>You don't have any task</h4>
        <button
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Add Task
        </button>
        <AddTaskModal user={user}></AddTaskModal>
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="mt-4">
        {(allTasks || newData) && (
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-2 mb-3 align-items-center">
              <div className="dropdown z-3">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Filter Tasks
                </button>
                <ul className="dropdown-menu">
                  <li
                    className="cursor-pointer"
                    onClick={() => setsearchTerm("all")}
                  >
                    <span className="dropdown-item cursor-pointer">
                      All Tasks
                    </span>
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setsearchTerm("completed")}
                  >
                    <span className="dropdown-item ">Completed</span>
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setsearchTerm("pending")}
                  >
                    <span className="dropdown-item ">Pending</span>
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setsearchTerm("high")}
                  >
                    <span className="dropdown-item ">High Tasks</span>
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setsearchTerm("mid")}
                  >
                    <span className="dropdown-item ">Mid Tasks</span>
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setsearchTerm("low")}
                  >
                    <span className="dropdown-item ">Low Tasks</span>
                  </li>
                </ul>
              </div>

              <div>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  placeholder="Search..."
                />
              </div>
            </div>
            <div>
              <button
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add Task
              </button>
            </div>
          </div>
        )}

        {allTasks.length !== 0 && (
          <TasksTable
            allTasks={newData}
            handleDelete={handleDelete}
            handleTaskCompleted={handleTaskCompleted}
            user={user}
          ></TasksTable>
        )}

        <AddTaskModal user={user}></AddTaskModal>
      </div>
    </div>
  );
};

export default Home;
