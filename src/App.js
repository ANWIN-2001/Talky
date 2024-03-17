import React from 'react';
import './App.css';
import Post from './Posts'; // Import the Post component
import AddPost from './AddPost';// Import the option to add Post 
function App() {
  return (
    
    <div className="App">
      <div className='header'>
        <h1>GazeboTalks</h1>
        <img src="gazebotransparent.png"></img>
      </div>
      <div classname="postadd">
        <AddPost/>{/* Add new Post  */}
      </div>
      <div className="post">
        <Post /> {/* Render the Post component */}
      </div>
    </div>
  );
}

export default App;
