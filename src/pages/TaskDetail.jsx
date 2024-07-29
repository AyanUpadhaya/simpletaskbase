import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../components/shared/ui/BackButton";
import EditTask from "../components/forms/EditTask";

const TaskDetail = () => {
  const { state } = useLocation();
  const { payload, user } = state || {};
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="py-3">
      <div className="mb-3">
        <BackButton route={"/"}></BackButton>
      </div>
      <div className="d-flex justify-content-between">
        <div className="w-50">
          {!isEditing ? (
            <div>
              <h6>{payload?.title}</h6>
              <br />
              <article>{payload?.description}</article>
            </div>
          ) : (
            <EditTask
              task={payload}
              setLoading={setLoading}
              loading={loading}
            ></EditTask>
          )}
        </div>
        <div>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="btn btn-secondary"
          >
            {!isEditing ? "Edit" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
