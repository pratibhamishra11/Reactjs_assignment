import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [student, setBook] = useState({
    name: "",
    course: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8000/student/${bookId}`, student);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="course"
        name="course"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Recor</Link>
    </div>
  );
};

export default Update;