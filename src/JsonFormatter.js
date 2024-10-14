// src/JsonFormatter.js
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './JsonFormatter.css';

function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState('{}');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const formatJSON = (inputJSON) => {
    try {
      const parsedJSON = JSON.parse(inputJSON); // Validate JSON
      return JSON.stringify(parsedJSON, null, 2); // Format JSON with 2 spaces
    } catch (error) {
      return `Invalid JSON: ${error.message}`;
    }
  };

  const handleFormat = () => {
    const formattedJSON = formatJSON(jsonInput);
    setJsonOutput(formattedJSON);
    setError(formattedJSON.startsWith('Invalid') ? formattedJSON : '');
    setCopySuccess(''); // Reset copy success message
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput).then(
      () => setCopySuccess('Copied to clipboard!'),
      (err) => setCopySuccess('Failed to copy!')
    );
  };

  return (
    <div className="json-formatter-container">
      <div className="editor-section">
        <Editor
          height="calc(100% - 10px)" /* Fills container height with 10px margin */
          defaultLanguage="json"
          value={jsonInput}
          onChange={(value) => setJsonInput(value)}
          options={{
            minimap: { enabled: false }, // Disables the minimap
          }}
        />
      </div>

      <div className="button-section">
        <button onClick={handleFormat}>Format JSON</button>
        <button onClick={handleCopy} disabled={!jsonOutput || error}>
          Copy Formatted JSON
        </button>
        {copySuccess && <p style={{ color: 'green' }}>{copySuccess}</p>}
      </div>

      <div className="output-section">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <textarea 
            value={jsonOutput} 
            readOnly 
            placeholder="Formatted JSON output"
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
    </div>
  );
}

export default JsonFormatter;