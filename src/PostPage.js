import React, { useContext } from "react";
import { useParams,Link } from "react-router-dom";
import DataContext from "./Context/DataContext";

const PostPage = () => {
  const { posts, handleDelete}=useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => 
    (post.id.toString() === id)
  );
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.dateTime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
            <button className="editButton">Edit Post</button>
            </Link>
            <button className="deleteButton" onClick={()=>handleDelete(post.id)}>Delete Post</button>
          </>
        )}
        {!post && (
          <main className="Missing">
            <h2>Page Not Found</h2>
            <p>Well, thats disappointing</p>
            <Link to="/">Visit Our Home Page</Link>
          </main>
        )}
      </article>
    </main>
  );
};

export default PostPage;
