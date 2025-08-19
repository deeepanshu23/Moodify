import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

function getTodayStartISO() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString();
}

export default function TarunTracker({ resetTrigger }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      const todayStart = getTodayStartISO();
      const { data, error } = await supabase
        .from("mood_logs")
        .select("code")
        .gte("created_at", todayStart)
        .gte("code", 2);

      setCount(data ? data.length : 0);
    }
    fetchCount();
  }, [resetTrigger]);

  return (
    <div>
      <h3>Tarun Tracker</h3>
      <p>
        Boss hit Code 2+ <b>{count}</b> times.
        <br />
        {count >= 5
          ? "🍜 Tarun wins Chinese food!"
          : "No noodles for Tarun yet."}
      </p>
    </div>
  );
}
