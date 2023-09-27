import React, { useContext } from "react";
import DataContext from "./Context/DataContext";

const NewPost = () => {
  const { postTitle, setPostTitle, postBody, setPostBody, handleSubmit } =
    useContext(DataContext);
  return (
    <main className="NewPost">
      <h2>NewPost</h2>
      <form className="newPostForm" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
