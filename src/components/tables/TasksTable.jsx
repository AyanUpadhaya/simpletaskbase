import React from "react";
import { formatTimestamp } from "../../utils/formatTimeStamp";
import { useNavigate } from "react-router-dom";

const TasksTable = ({ allTasks, handleTaskCompleted, handleDelete, user }) => {
  const navigate = useNavigate();
  const handleNavigate = (item) => {
    navigate(`/task-detail`, {
      state: {
        payload: item,
        user: user,
      },
    });
  };

  const handlePriority = (num)=>{
    switch(num){
      case "1":
        return "High"
      case "2":
        return "Mid"
      default:
        return "Low"
    }
  }
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Created</th>
            <th scope="col">Priority</th>
            <th scope="col text-center">Status</th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {allTasks.map((task, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                {task?.title?.length > 30
                  ? task.title.slice(0, 31) + "..."
                  : task?.title}
              </td>
              <td>{task?.timestamp ? formatTimestamp(task?.timestamp) : ""}</td>
              <td>{handlePriority(task.priority)}</td>
              <td>{task.is_completed ? "Completed" : "Pending"}</td>
              <td className="d-flex gap-3 justify-content-center">
                <button
                  onClick={() => handleTaskCompleted(task?.id, task)}
                  className="btn btn-success "
                >
                  {task.is_completed ? (
                    <i className="fa-regular fa-circle-xmark"></i>
                  ) : (
                    <i className="fa-solid fa-circle-check"></i>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(task?.id)}
                  className="btn btn-danger "
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
                <button
                  onClick={() => handleNavigate(task)}
                  className="btn btn-primary "
                >
                  <i className="fa-solid fa-eye"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
