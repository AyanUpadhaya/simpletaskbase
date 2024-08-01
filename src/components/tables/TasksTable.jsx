import React from "react";
import { formatTimestamp } from "../../utils/formatTimeStamp";
import { useNavigate } from "react-router-dom";

const TasksTable = ({
  allTasks,
  handleTaskCompleted,
  handleDelete,
  user,
  indexOfFirstRow,
  indexOfLastRow,
  currentPage,
  rowsPerPage,
}) => {
  const navigate = useNavigate();
  const currentRows = allTasks?.slice(indexOfFirstRow, indexOfLastRow);
  const handleNavigate = (item) => {
    navigate(`/task-detail`, {
      state: {
        payload: item,
        user: user,
      },
    });
  };

  const handlePriority = (num) => {
    switch (num) {
      case "1":
        return "High";
      case "2":
        return "Mid";
      default:
        return "Low";
    }
  };
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col head-cell">#</th>
            <th scope="col head-cell">Task</th>
            <th scope="col head-cell">Created</th>
            <th scope="col head-cell">Priority</th>
            <th scope="col head-cell text-center">Status</th>
            <th scope="col head-cell" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.length == 0 ? (
            <tr>
              <td colSpan={8}>
                <h2 className="text-center">No data found</h2>
              </td>
            </tr>
          ) : (
            <>
              {currentRows.map((task, index) => (
                <tr key={index}>
                  {/* <th scope="row">{index + 1}</th> */}
                  <th scope="row">
                    {currentPage === 1 && index + 1 < 10
                      ? "0" + (rowsPerPage * (currentPage - 1) + index + 1)
                      : rowsPerPage * (currentPage - 1) + index + 1}
                  </th>
                  <td>
                    {task?.title?.length > 30
                      ? task.title.slice(0, 31) + "..."
                      : task?.title}
                  </td>
                  <td>
                    {task?.timestamp ? formatTimestamp(task?.timestamp) : ""}
                  </td>
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
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
