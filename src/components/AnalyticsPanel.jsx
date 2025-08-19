import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

function getTodayStartISO() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString();
}

export default function AnalyticsPanel({ resetTrigger }) {
  const [logs, setLogs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchLogs() {
      const todayStart = getTodayStartISO();
      const { data, error } = await supabase
        .from("mood_logs")
        .select("*")
        .gte("created_at", todayStart)
        .order("created_at", { ascending: false });

      setLogs(data || []);
      setTotalCount(data ? data.length : 0);
    }

    fetchLogs();
  }, [resetTrigger]);

  return (
    <div>
      <h3>Analytics Panel</h3>
      <p>
        Total logs today: <b>{totalCount}</b>
      </p>
      <ul className="analytics-log-list">
        {logs.map((log) => (
          <li key={log.id}>
            {log.created_at
              ? new Date(log.created_at).toLocaleString()
              : "Unknown time"}
            : Code {log.code} by {log.username || log.user || "Unknown"}
          </li>
        ))}
      </ul>
    </div>
  );
}
