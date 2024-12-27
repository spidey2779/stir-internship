import React, { useState } from "react";
import { runScript } from "../services/api";

interface TrendData {
  uniqueID: string;
  trends: string[];
  timestamp: string;
  ipAddress: string;
}

const Trends: React.FC = () => {
  const [trends, setTrends] = useState<TrendData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrends = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await runScript();
      setTrends(data);
    } catch (err) {
      setError("Failed to fetch trends. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trends">
      <button onClick={fetchTrends} disabled={loading}>
        {loading ? "Loading..." : "Click here to run the script"}
      </button>

      {error && <p className="error">{error}</p>}

      {trends && (
        <>
          <h2>
            These are the most happening topics as on{" "}
            {new Date(trends.timestamp).toLocaleString()}
          </h2>
          <ul>
            {trends.trends.map((trend, index) => (
              <li key={index}>{trend}</li>
            ))}
          </ul>
          <p>
            The IP address used for this query was{" "}
            <strong>{trends.ipAddress}</strong>.
          </p>
          <h3>JSON Extract:</h3>
          <pre>{JSON.stringify(trends, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default Trends;
