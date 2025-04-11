import React, { useState } from 'react';
import './QueryForm.css';

function QueryForm({ query, setQuery, onSubmit }) {
  return (
    <div className="query-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question..."
      />
      <button onClick={onSubmit}>Ask</button>
    </div>
  );
}


export default QueryForm;
