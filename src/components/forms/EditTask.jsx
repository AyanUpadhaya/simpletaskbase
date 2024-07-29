import React, { useState } from "react";
import getCurrentUnixTimestamp from "../../utils/getCurrentUnixTimestamp";
import { ErrorNotify, InfoNotify } from "../../utils/getNotify";
import { useNavigate } from "react-router-dom";
import { updateTask } from "../../firebase/functions/firebasedb.functions";

const EditTask = ({ loading, task, setLoading }) => {
  const [taskPriority, setPriority] = useState(task?.priority || "1");
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.taskTitle.value;
    const description = form.taskDescription.value;
    const priority = form.priority.value;

    if (
      title == task?.title &&
      description == task?.description &&
      priority == task?.priority
    ) {
      ErrorNotify("No changes made");
      setLoading(false);
      return;
    }

    const data = {
      title,
      description,
      priority,
    };
    try {
      const res = await updateTask(task?.id, data);
      setLoading(false);
      form.reset();
      InfoNotify("Task updated");
      navigate('/');
    } catch (error) {
      ErrorNotify(error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taskTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="taskTitle"
            name="taskTitle"
            placeholder="Task title..."
            required
            defaultValue={task?.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskDescription" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            name="taskDescription"
            id="taskDescription"
            rows="3"
            required
            defaultValue={task?.description}
          ></textarea>
        </div>
        <div>
          <select
            required
            name="priority"
            className="form-select"
            value={taskPriority}
            onChange={handlePriorityChange}
          >
            <option value="1">High</option>
            <option value="2">Mid</option>
            <option value="3">Low</option>
          </select>
        </div>

        <div className="mt-3">
          <button disabled={loading} type="submit" className="btn btn-primary">
            {loading ? "Loading..." : " Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
