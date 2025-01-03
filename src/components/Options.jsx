import React from 'react';

const Options = ({ exportNotes, importNotes }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Options</h2>
      <div className="flex justify-between">
        <button onClick={exportNotes} className="p-2 bg-green-500 text-white rounded">Export Notes</button>
        <input type="file" accept="application/json" onChange={importNotes} className="p-2 border rounded" />
      </div>
    </div>
  );
};

export default Options;
