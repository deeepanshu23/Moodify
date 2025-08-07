import React from "react";
import MoodLogger from "./MoodLogger";
import TarunTracker from "./TarunTracker";
import AnalyticsPanel from "./AnalyticsPanel";

export default function Dashboard() {
  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      <MoodLogger />
      <TarunTracker />
      <AnalyticsPanel />
    </div>
  );
}
