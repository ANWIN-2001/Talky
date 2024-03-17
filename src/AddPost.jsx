import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPost() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePost = async () => {
        if (!formData.title || !formData.content) {
            toast.error("Please fill all the fields");
            return;
        }

        try {
            const articleRef = collection(db, "Posts");
            await addDoc(articleRef, {
                title: formData.title,
                content: formData.content,
                createdAt: Timestamp.now().toDate(),
            });

            // Clear form data after posting
            setFormData({
                title: "",
                content: "",
            });
            toast.success("Post added successfully!");
        } catch (error) {
            console.error("Error adding post: ", error);
            toast.error("Failed to add post. Please try again later.");
        }
    };

    return (
        <div className="Addpost">
            <h2>Add Post</h2>

            {/* Topic */}
            <input
                placeholder="Enter Topic"
                type="text"
                name="title"
                className="input-control"
                value={formData.title}
                onChange={(e) => handleChange(e)}
            />

            {/* Description */}
            <textarea
                placeholder="Enter content"
                type="text"
                name="content"
                className="input-control"
                value={formData.content}
                onChange={(e) => handleChange(e)}
            />

            <button className="post-input-button" onClick={handlePost}>Post</button>

            {/* Toast container for displaying notifications */}
            <ToastContainer />
        </div>
    );
}
