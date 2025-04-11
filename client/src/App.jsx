import React, { useState } from 'react';
import QueryForm from './components/QueryForm';
import TraceViewer from './components/TraceViewer';
import ReactMarkdown from 'react-markdown';
import { ClipLoader } from 'react-spinners';

import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [traceLogs, setTraceLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // const handleQuerySubmit = async () => {
  //   console.log("Sending query:", query);

  //   const trimmedQuery = query.trim();
  //   if (trimmedQuery === '') {
  //     setResponse({
  //       summary: "❌ No valid query provided.",
  //       trace: [{
  //         role: "System",
  //         action: "Validation",
  //         result: "Empty or invalid query."
  //       }]
  //     });
  //     return;
  //   }

  //   const res = await fetch('http://localhost:5000/api/ask', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ query: trimmedQuery })
  //   });

  //   const data = await res.json();
  //   setResponse(data.summary ? data : null);
  //   setTraceLogs(data.trace || []);
  // };
  const handleQuerySubmit = async () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery === '') {
      setResponse({
        summary: "❌ No valid query provided.",
        trace: [{
          role: "System",
          action: "Validation",
          result: "Empty or invalid query."
        }]
      });
      return;
    }
  
    setLoading(true); // Show loader
  
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
        summary: "⚠️ Something went wrong.",
        trace: [{
          role: "System",
          action: "Error",
          result: error.message
        }]
      });
    }
  
    setLoading(false); // Hide loader
  };

  return (
    <div className="App">
      <h1>🌐  Planner Agent</h1>

      <QueryForm query={query} setQuery={setQuery} onSubmit={handleQuerySubmit} />

      {response && (
        <div className="response-box">
          <h2>Final Response</h2>
          <div className="markdown-output">
            <ReactMarkdown>{response.summary}</ReactMarkdown>
          </div>
        </div>
      )}

      {traceLogs.length > 0 && (
        <div className="trace-box">
          <h3>🧠 Trace Logs</h3>
          <ul>
            {traceLogs.map((log, index) => (
              <li key={index}>
                <strong>{log.role}</strong> → <em>{log.action}</em>: {log.result}
              </li>
            ))}
          </ul>
        </div>
      )}
      {loading && (
  <div className="loader">
    <ClipLoader size={50} color="#007bff" />
    <p>Generating response...</p>
  </div>
)}

    </div>
  );
}

export default App;
