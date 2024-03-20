import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [student, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/student");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(Books);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/student/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>RECORDS</h1>
      <div className="books">
        {student.map((book) => (
          <div key={book.id} className="book">
            <img src={book.account} alt="" />
            <h2>{book.name}</h2>
            <p>{book.course}</p>
            <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new Record
        </Link>
      </button>
    </div>
  );
};

export default Books;