import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
const app = express();
const port = 3000;
var posts = [];
const number = 0;
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.get("/create", (req, res) => {
  res.render("create.ejs", { posts: posts });
});
app.post("/createpost", (req, res) => {
  var post = {
    name: req.body["name"],
    topic: req.body["topic"],
    content: req.body["content"],
    date: new Date(),
    id:generateUniqueId(),
  };
  posts.push(post);
  console.log("post :" + post.name + post.topic + post.content + post.date);
  console.log("posts :" + posts);
  res.render("index.ejs", { posts: posts });
});

app.post("/delete", (req, res) => {
    const postIdToDelete = req.body.postId;
    const indexToDelete = posts.findIndex(post => post.id === postIdToDelete);
  
    if (indexToDelete !== -1) {
      posts.splice(indexToDelete, 1);
    }
    res.render("index.ejs", { posts: posts });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`link to localhost : http://localhost:${port}/`);
});

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }