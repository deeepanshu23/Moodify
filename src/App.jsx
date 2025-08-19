import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AnalyticsPanel from "./components/AnalyticsPanel";
import { supabase } from "./utils/supabaseClient";

export default function App() {
  const [pin, setPin] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [resetStatus, setResetStatus] = useState("");
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  async function handleReset() {
    setResetStatus("Resetting...");
    const { error } = await supabase.from("mood_logs").delete().neq("id", 0);
    setResetStatus(error ? "Reset failed." : "Reset successful!");
    setResetTrigger((t) => t + 1); // trigger refresh
    setTimeout(() => setResetStatus(""), 2000);
  }

  if (!pin) {
    return <Login onLogin={setPin} />;
  }

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <h1>🌦️ Project Boss Weather</h1>
      <button
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          padding: "0.5em 1em",
          borderRadius: 8,
          border: "none",
          background: darkMode ? "#222" : "#eee",
          color: darkMode ? "#fff" : "#222",
          cursor: "pointer",
        }}
        onClick={() => setDarkMode((d) => !d)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <Dashboard resetTrigger={resetTrigger} setResetTrigger={setResetTrigger} />
      {pin === "9999" && (
        <>
          <AnalyticsPanel resetTrigger={resetTrigger} />
          <button
            style={{
              margin: "1em 0",
              background: "#e53e3e",
              color: "#fff",
              borderRadius: 8,
              padding: "0.7em 1.4em",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleReset}
          >
            Reset Tarun Tracker & Analytics
          </button>
          <div>{resetStatus}</div>
        </>
      )}
    </div>
  );
}
