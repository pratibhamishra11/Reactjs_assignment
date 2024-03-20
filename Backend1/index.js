import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chinupm@1900",
  database: "db",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/student", (req, res) => {
  const q = "SELECT * FROM student";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/student", (req, res) => {
  const q = "INSERT INTO student(`name`, `course`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.course,
    
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/student/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM student WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/student/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE student SET `name`= ?, `course`=? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.course,
    
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8000, () => {
  console.log("Connected to backend.");
});