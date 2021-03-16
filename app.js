const express = require("express");
const bodyParser = require("body-parser");
const mongooose = require("mongoose");
const _ = require("lodash");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://<ADMIN>:<PASSWORD>@cluster0.2h90q.mongodb.net//yourDatabaseName", { useNewUrlParser: true, useUnifiedTopology: true });

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

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

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
