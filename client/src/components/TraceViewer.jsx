import React from 'react';

const TraceViewer = ({ logs }) => {
  if (!logs || logs.length === 0) return null;

  return (
    <div className="trace-viewer">
      <h2>Trace Logs</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <strong>Role:</strong> {log.role} &nbsp;|&nbsp;
            <strong>Action:</strong> {log.action} &nbsp;|&nbsp;
            <strong>Result:</strong> {log.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TraceViewer;
