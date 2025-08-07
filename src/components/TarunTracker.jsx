import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function TarunTracker() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function fetchCount() {
      const { data, error } = await supabase
        .from('mood_logs')
        .select('code', { count: 'exact' })
        .gte('code', 2);
      setCount(data ? data.length : 0);
    }
    fetchCount();
  }, []);

  return (
    <div>
      <h3>Tarun Tracker</h3>
      <p>
        Boss hit Code 2+ <b>{count !== null ? count : '...'}</b> times.
        <br />
        {count !== null && count < 5 ? '🍜 Tarun wins Chinese food!' : 'No noodles for Tarun yet.'}
      </p>
    </div>
  );
}