// Posts.js
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore" ;
import CommentForm from './CommentForm';
import LikeButton from './LikeButton';
import { db } from "./firebaseConfig"


export default function Post() {
  const [posts, setPosts] = useState([]);
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');

  useEffect(()=>{
    const articleRef = collection(db,"Posts");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q,(snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(posts);
      console.log(posts);
    });
  },[]);

  const handleTopicChange = event => {
    setTopic(event.target.value);
  };
 
  const handleContentChange = event => {
    setContent(event.target.value);
  };

  const addPost = () => {
    if (topic.trim() !== '' && content.trim() !== '') {
      const newPost = {
        id: Date.now(),
        title: topic,
        body: content,
        comments: [],
        reacted: false,
      };
      setPosts([...posts, newPost]);
      setTopic('');
      setContent('');
    }
  };

  const addComment = (postId, comment) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleReaction = (postId, reaction) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reacted: reaction,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
//imp line bellow
  // return (
  //   <div>
  //     {posts.length === 0 ? (
  //       <p>No Posts found!</p>
  //     ) : (
  //       posts.map(({id,title,content,createdAt}) => (
  //         <div className='created' key={id}>
  //           <div className='row'>
  //              <h2>{title}</h2>
  //              <p>{createdAt.toDate().toDateString()}</p>
  //              <h4>{content}</h4>
  //           </div>  
  //         </div>
  //       ))
  //     )}
  //   </div>
  // );

//imp line above

  // return (
  //   <div className='post'>
  //     <h3>Add a Post</h3>
  //     <input
  //       type="text"
  //       placeholder="Enter topic"
  //       value={topic}
  //       onChange={handleTopicChange}
  //     />
  //     <textarea
  //       placeholder="Enter post content"
  //       value={content}
  //       onChange={handleContentChange}
  //     />
  //     <button onClick={addPost}>Post</button>

  //     {posts.map(post => (
  //       <div key={post.id}>
  //         <h3>{post.title}</h3>
  //         <p>{post.body}</p>
  //         <LikeButton postId={post.id} onReaction={handleReaction} reacted={post.reacted} />
  //         <h4>Comments:</h4>
  //         <ul>
  //           {post.comments.map((comment, index) => (
  //             <li key={index}>
  //               {comment}
  //               {/* LikeButton for reacting to comments */}
  //               <LikeButton postId={post.id} commentIndex={index} onReaction={handleReaction} />
  //             </li>
  //           ))}
  //         </ul>
  //         {/* CommentForm for adding comments */}
  //         <CommentForm postId={post.id} addComment={addComment} />
  //       </div>
  //     ))}
  //   </div>
  // );
};


