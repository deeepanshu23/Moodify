import React from "react";
import MoodLogger from "./MoodLogger";
import TarunTracker from "./TarunTracker";

export default function Dashboard({ resetTrigger, setResetTrigger }) {
  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      <MoodLogger setResetTrigger={setResetTrigger} />
      <TarunTracker resetTrigger={resetTrigger} />
    </div>
  );
}
