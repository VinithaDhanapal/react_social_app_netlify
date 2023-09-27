import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import { format } from "date-fns";
import api from "../api/posts";
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { width } = useWindowSize();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), "MMMM dd,yyyy pp");
    const newPost = { id, title: postTitle, dateTime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    setPostBody("");
    setPostTitle("");
    navigate("/");
  };

  const handleDelete = async (id) => {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
    try {
      await api.delete(`/posts/${id}`);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    navigate("/");
  };

  const handleEdit = async (id) => {
    const dateTime = format(new Date(), "MMMM dd,yyyy pp");
    const updatePost = { id, title: editTitle, dateTime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditBody("");
      setEditTitle("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    fetchPosts();
  }, []);

  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResults,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        handleSubmit,
        posts,
        handleEdit,
        editBody,
        setEditBody,
        editTitle,
        setEditTitle,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
