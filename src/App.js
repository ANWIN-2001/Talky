import React from 'react';
import './App.css';
import Post from './Posts'; // Import the Post component

function App() {
  return (
    <div className="App">
      <h1>Post Comment Like App</h1>
      <Post /> {/* Render the Post component */}
    </div>
  );
}

export default App;
