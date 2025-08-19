import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const moodCodes = [
  { code: 4, label: "☀️ Clear Skies" },
  { code: 3, label: "🌬️ Breezy" },
  { code: 2, label: "⚠️ Caution Zone" },
  { code: 1, label: "⛈️ Storm Warning" },
  { code: 0, label: "🔥 Meltdown" },
];

export default function MoodLogger({ setResetTrigger }) {
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("");

  async function logMood() {
    if (selected === null) return;
    setStatus("Logging...");
    const { error } = await supabase
      .from("mood_logs")
      .insert([{ code: selected, username: "Agent" }]);
    setStatus(error ? "Error logging mood." : "Mood logged!");
    if (!error && setResetTrigger) setResetTrigger((t) => t + 1); // trigger refresh
  }

  return (
    <div>
      <h3>Log Boss Mood</h3>
      <div style={{ display: "flex", gap: 8 }}>
        {moodCodes.map((m) => (
          <button
            key={m.code}
            style={{
              fontSize: 24,
              background: selected === m.code ? "#ffd700" : "#eee",
            }}
            onClick={() => setSelected(m.code)}
          >
            {m.label}
          </button>
        ))}
      </div>
      <button
        onClick={logMood}
        disabled={selected === null}
        style={{ marginTop: 12 }}
      >
        Submit
      </button>
      <div>{status}</div>
    </div>
  );
}
