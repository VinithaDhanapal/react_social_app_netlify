import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Missing from "./Missing";
import DataContext from "./Context/DataContext";

const EditPost = () => {
  const { posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle } =
    useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Title:</label>
            <input
              id="editTitle"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            <label htmlFor="editBody">Post:</label>
            <textarea
              id="editBody"
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              required
            />
            <button
              type="submit"
              onClick={() => {
                handleEdit(post.id);
              }}
            >
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <Missing />
        </>
      )}
    </main>
  );
};

export default EditPost;
