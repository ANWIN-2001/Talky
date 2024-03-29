// import React, { useState } from "react";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { db } from "./firebaseConfig";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AddPost() {
//     const [formData, setFormData] = useState({
//         title: "",
//         content: "",
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handlePost = async () => {
//         if (!formData.title || !formData.content) {
//             toast.error("Please fill all the fields");
//             return;
//         }

//         try {
//             const articleRef = collection(db, "Posts");
//             await addDoc(articleRef, {
//                 title: formData.title,
//                 content: formData.content,
//                 createdAt: Timestamp.now().toDate(),
//             });

//             // Clear form data after posting
//             setFormData({
//                 title: "",
//                 content: "",
//             });
//             toast.success("Post added successfully!");
//         } catch (error) {
//             console.error("Error adding post: ", error);
//             toast.error("Failed to add post. Please try again later.");
//         }
//     };

//     return (
//         <div className="Addpost">
//             <h2>Add Post</h2>

//             {/* Topic */}
//             <input
//                 placeholder="Enter Topic"
//                 type="text"
//                 name="title"
//                 className="input-control"
//                 value={formData.title}
//                 onChange={(e) => handleChange(e)}
//             />

//             {/* Description */}
//             <textarea
//                 placeholder="Enter content"
//                 type="text"
//                 name="content"
//                 className="input-control"
//                 value={formData.content}
//                 onChange={(e) => handleChange(e)}
//             />

//             <button className="post-input-button" onClick={handlePost}>Post</button>

//             {/* Toast container for displaying notifications */}
//             <ToastContainer />
//         </div>
//     );
// }
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, addDoc, Timestamp } from "firebase/firestore";
import CommentForm from './CommentForm';
import LikeButton from './LikeButton';
import { db } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    topic: "",
    content: ""
  });
  const [comments, setComments] = useState([]);
  const [Newcomment, setNewComment] = useState({
    comment: ""
  });

  useEffect(()=>{
    const articleRef = collection(db,"Posts");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q,(snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(posts);
    });
  },[]);

  useEffect(()=>{
    const commentRef = collection(db,"comments");
    const q = query(commentRef, orderBy("createdAt", "desc"));
    onSnapshot(q,(snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments);
    });
  },[]);

  const handleTopicChange = (event) => {
    setNewPost({ ...newPost, topic: event.target.value});
  };
 
  const handleContentChange = (event) => {
    setNewPost({ ...newPost, content: event.target.value });
  };

    const handleCommentChange =(event) => {
      event.preventDefault();
      if (!comments.trim()) return;
      // addComment(postId, comment); // Include postId when submitting comment
      setComments({ ...comments, comment: event.target.value});
    };

  const addNewPost = async () => {
    try {
      if (newPost.topic.trim() !== '' && newPost.content.trim() !== '') {
        const postRef = collection(db, "Posts");
        await addDoc(postRef, {
          title: newPost.topic,
          content: newPost.content,
          createdAt: Timestamp.now().toDate()
        });
        console.log("New post added successfully!");
        setNewPost({
          topic: "",
          content: ""
        });
        toast.success("Post added successfully!");
      } else {
        console.log("Please fill all the fields");
        toast.error("Please fill all the fields");
      }
    } catch (error) {
      console.error("Error adding new post: ", error);
      toast.error("Failed to add post. Please try again later.");
    }
  };

  const addPostReaction = async (postId, reaction) => {
    try {
      const postRef = collection(db, "Posts");
      await addDoc(postRef, {
        postId: postId,
        reaction: reaction,
        createdAt: Timestamp.now().toDate()
      });
      console.log("Reaction added successfully!");
    } catch (error) {
      console.error("Error adding reaction: ", error);
      toast.error("Failed to add reaction. Please try again later.");
    }
  };

  const addComment = async (postId, comment) => {
    try {
      const commentRef = collection(db, "comments");
      await addDoc(commentRef, {
        postId: postId,
        comment: comment,
        createdAt: Timestamp.now().toDate()
      });
      console.log("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment: ", error);
      toast.error("Failed to add comment. Please try again later.");
    }
  };

  return (
    <div>
      <div className='add-post'>
        <h3>Add a New Post</h3>
        <input
          type="text"
          placeholder="Enter topic"
          value={newPost.topic}
          onChange={handleTopicChange}
        />
        <textarea
          placeholder="Enter post content"
          value={newPost.content}
          onChange={handleContentChange}
        />
        <button onClick={addNewPost}>Post</button>
      </div>

      {posts.length === 0 ? (
        <p>No Posts found!</p>
      ) : (
        posts.map(({id,title,content,createdAt}) => (
          <div className='created' key={id}>
            <div className='row'>
               <h2>{title}</h2>
               <p>{createdAt.toDate().toDateString()}</p>
               <h4>{content}</h4>
               <LikeButton postId={id} onReaction={addPostReaction} />
               {/* <CommentForm postId={id} addComment={addPostComment} /> */}
               </div>
               </div>
               ))
          )};
               <form>
                  <input
                    type="text"
                    value={comments.comment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                  />
                  <button type="submit" onClick={addComment}>Add Comment</button>
                </form>

                {comments.length === 0 ? (
                    <p>No Posts found!</p>
                  ) : (
                    comments.map(({postId,comment}) => (
                      <div className='created' key={postId}>
                        <div className='row'>
                          <p>{comment}</p>
                          {/* <p>{createdAt.toDate().toDateString()}</p> */}
                          {/* <h4>{content}</h4> */}
                          {/* <LikeButton postId={id} onReaction={addPostReaction} />
                          <CommentForm postId={id} addComment={addPostComment} /> */}
                        </div>  
                      </div>
                    ))
                  )};

               
       
      <ToastContainer />
    </div>
  );
};
