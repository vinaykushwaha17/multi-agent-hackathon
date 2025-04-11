import React, { useState } from 'react';
import QueryForm from './components/QueryForm';
import TraceViewer from './components/TraceViewer';
import ReactMarkdown from 'react-markdown';
import ClipLoader from 'react-spinners/ClipLoader'; // ✅ Loader
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [traceLogs, setTraceLogs] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Loader state

  const handleQuerySubmit = async () => {
    const trimmedQuery = query.trim();

    // ✅ Clear previous response and show loader
    setResponse(null);
    setTraceLogs([]);
    setLoading(true);

    if (trimmedQuery === '') {
      setResponse({
        summary: "❌ No valid query provided.",
        trace: [{
          role: "System",
          action: "Validation",
          result: "Empty or invalid query."
        }]
      });
      setLoading(false); // ❌ Stop loader
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmedQuery })
      });

      const data = await res.json();
      setResponse(data.summary ? data : null);
      setTraceLogs(data.trace || []);
    } catch (error) {
      setResponse({
        summary: "❌ Failed to connect to backend.",
        trace: [{ role: "System", action: "API Error", result: error.message }]
      });
    } finally {
      setLoading(false); // ✅ Stop loader after everything
    }
  };

  return (
    <div className="App">
      <h1>🌐 Planner Agent</h1>
      <QueryForm query={query} setQuery={setQuery} onSubmit={handleQuerySubmit} />
      
      {/* ✅ Show loader while loading */}
      {loading && (
        <div className="loader-container">
          <ClipLoader size={50} color="#36d7b7" />
          <p>Processing your query...</p>
        </div>
      )}

      {/* ✅ Show response after loading */}
      {!loading && response && (
        <div className="response-box">
          <h2>Final Response</h2>
          <ReactMarkdown>{response.summary}</ReactMarkdown>
        </div>
      )}

      {!loading && traceLogs.length > 0 && <TraceViewer logs={traceLogs} />}
    </div>
  );
}

export default App;
