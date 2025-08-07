import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function AnalyticsPanel() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchLogs() {
      const { data } = await supabase
        .from("mood_logs")
        .select("*")
        .order("created_at", { ascending: false });
      setLogs(data || []);
    }
    fetchLogs();
  }, []);

  return (
    <div>
      <h3>Analytics Panel</h3>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.created_at}: Code {log.code} by {log.user}
          </li>
        ))}
      </ul>
    </div>
  );
}
