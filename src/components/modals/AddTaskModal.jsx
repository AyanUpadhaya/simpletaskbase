import React, { useRef, useState } from "react";
import { ErrorNotify, InfoNotify } from "../../utils/getNotify";
import { addTask } from "../../firebase/functions/firebasedb.functions";
import getCurrentUnixTimestamp from "../../utils/getCurrentUnixTimestamp";

const AddTaskModal = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const modalRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const title = form.taskTitle.value;
    const description = form.taskDescription.value;
    const priority = form.priority.value;
    const currentTimeStamp = getCurrentUnixTimestamp();

    if (!title || !description || !priority) {
      ErrorNotify("Enter required fields");
      setLoading(false);
      return;
    }

    const data = {
      title,
      description,
      priority,
      userId: user?.uid,
      is_completed: false,
      timestamp: currentTimeStamp,
    };

    try {
      const res = await addTask(data);
      setLoading(false);
      form.reset();
    } catch (error) {
      ErrorNotify(error.message);
      setLoading(false);
    }
  };

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Add new task
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
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
                ></textarea>
              </div>
              <div>
                <select
                  defaultValue={0}
                  required
                  name="priority"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="1">High</option>
                  <option value="2">Mid</option>
                  <option value="3">Low</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  {loading ? "Loading..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
