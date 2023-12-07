const express = require("express");
const bodyParser = require("body-parser");
const mongooose = require("mongoose");
const _ = require("lodash");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://<ADMIN>:<PASSWORD>@cluster0.2h90q.mongodb.net/yourDatabaseName", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongooose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log.bind(console, "We're connected!");
});

const postsSchema = new mongooose.Schema({
  title: String,
  content: String
});

const Post = mongooose.model("Post", postsSchema);

const homeStartingContent = "Welcome! In this platform you can create blog posts or even a daily journal by going to 'Compose' and composing your post/journal entry.";
const aboutContent = "Here you can write who you are and what you do.";
const contactContent = "Make sure to leave your contact info here, so your visitors are able to contact you.";

app.get("/", (req, res) => {
  const home = "Home";

  Post.find((err, foundPosts) => {
    if (err) return console.error(err);
    console.log(foundPosts);
    res.render("home", { home: home, homeStartingContent: homeStartingContent, posts: foundPosts });
  });
});

app.get("/about", (req, res) => {
  const about = "About";
  res.render("about", { about: about, aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  const contact = "Contact";
  res.render("contact", { contact: contact, contactContent: contactContent });
});

app.get("/compose", (req, res) => {
  const compose = "Compose";
  res.render("compose", { compose: compose });
});

app.get("/posts/:postId", (req, res) => {
  const requestedId = req.params.postId;

  Post.findById(requestedId, (err, post) => {
    if (err) console.error(err);
    res.render("post", { postTitle: post.title, postContent: post.content });
  });
});

app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.postBody
  });

  post.save((err, post) => {
    if (err) return console.error(err);
    console.log(post);
    res.redirect("/");
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App is up and running");
});
