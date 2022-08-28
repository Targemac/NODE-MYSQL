const express = require("express");
const mysql = require("mysql");

// create a connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tcdevengr31258",
  database: "nodemysql_db",
});

//connect
db.connect((err) => {
  err ? console.log(err) : console.log("mysql Connected successfully");
});

const app = express();

//create db
app.get("/createdb", (req, res) => {
  let db_name = "nodemysql_db";
  let sql = `CREATE DATABASE IF NOT exists ${db_name}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(`${db_name} Database Created...`);
    }
  });
});

//create table
app.get("/createPostsTable", (req, res) => {
  let sql =
    "CREATE TABLE IF NOT exists posts(id int auto_increment,title varchar(255 ),body varchar(255),primary key (id ))";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      console.log("Posts Table created....");
      res.send("Posts Table created....");
    }
  });
});

//Insert post 1
app.get("/addPost1", (req, res) => {
  let post = {
    title: "Post one",
    body: "this is post number one",
  };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      console.log("Post Added to Table");
      res.send("Post 1 Added to Table");
    }
  });
});

//Insert post 2
app.get("/addPost2", (req, res) => {
  let post = {
    title: "Post Two",
    body: "this is post number Two",
  };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      console.log("Post 2 Added to Table");
      res.send("Post 2 Added to Table");
    }
  });
});

//Select All posts
app.get("/getPosts", (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
      console.log("All posts fetched...");
      res.send("All posts fetched...");
    }
  });
});

//Select Single post
app.get("/getPost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      console.log("Post fetched...");
      res.send("Post fetched...");
    }
  });
});

//Update post
app.get("/updatePost/:id", (req, res) => {
  let newTitle = "Updated Title";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE  id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      console.log("Post Updated...");
      res.send("Post Updated...");
    }
  });
});

//Delete post
app.get("/deletePost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      console.log("Post Deleted...");
      res.send("Post Deleted...");
    }
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on port: ${port} !`);
});
