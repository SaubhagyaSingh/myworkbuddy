import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutsDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    try {
      const apiUrl = "https://real-pink-abalone-kit.cyclic.app"; // replace with your backend URL
      const response = await fetch(`${apiUrl}/api/workouts/${workout._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        return;
      }

      const json = await response.json();

      dispatch({ type: "DELETE_WORKOUT", payload: json });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutsDetails;
