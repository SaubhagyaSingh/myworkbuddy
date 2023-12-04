import React, { useEffect } from "react";
import WorkoutsDetails from "../components/WorkoutsDetails";
import WorkoutsForm from "../components/WorkoutsForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        if (!response.ok) {
          console.error("Request failed with status:", response.status);
          return;
        }

        const json = await response.json();
        dispatch({ type: "SET_WORKOUTS", payload: json });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutsDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutsForm />
    </div>
  );
};

export default Home;
