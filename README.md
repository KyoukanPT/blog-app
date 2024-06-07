<h2>Blog App</h2>

<p>Instructions on how to download the source files and use the App: </p>

<h3>Terminal (Chosen directory to clone the files - Recommended --> Desktop)</h3>

1 - git clone https://github.com/KyoukanPT/blog-app.git

<hr>

<h3>Node Installation</h3>
 
 2 - Download and install <a href="https://nodejs.org/en/download"> Node.js </a> <br> 

 <hr>

<h3>Project Folder Directory (Terminal)</h3>

3 - npm install<br>
4 - npm install <a href="https://expressjs.com/en/starter/installing.html"> Express </a> <br>
5 - npm install <a href="https://ejs.co/"> EJS </a> <br>
6 - npm install <a href="https://www.npmjs.com/package/body-parser"> Body Parser </a> <br>
7 - npm install <a href="https://www.npmjs.com/package/mongoose"> Mongoose </a> <br>
8 - npm install <a href="https://lodash.com/"> Lodash </a> <br>
9 - node app.js

<hr>

<h3>How to use this App locally (In Your Computer)</h3>
10 - Replace the code in line 11 (app.js) with the following: <strong>mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {useNewUrlParser: true, useUnifiedTopology: true});<br></strong>
11 - Open a new terminal tab and run the following command: <strong>mongod</strong><br>
12 - After you successfully connect to MongoDB, open another new terminal tab and run the following command: <strong>mongo</strong><br><br>

<hr>

<h3>MongoDB Documentation</h3>
- Installation instructions - <strong> https://docs.mongodb.com/manual/administration/install-community/ </strong> <br>
- How to use mongo shell to query and manipulate the data in your database - <strong>https://docs.mongodb.com/manual/crud/</strong><br><br>

<hr>

<h3>How to use MongoDB Cloud Database (MongoDB Atlas)</h3>
- Line 11 (app.js) - Replace <strong><"ADMIN"></strong> and <strong><"PASSWORD"></strong> with your Atlas credentials <br>
- Line 11 (app.js) - Replace <strong>/yourDatabaseName</strong> with the name that you want to give to your database <br>
- Follow this Atlas tutorial to learn how to get started - <strong>https://docs.atlas.mongodb.com/getting-started/</strong> <br>

<hr>

<h3>Browser (After Step 12)</h3>
7 - <a href="http://localhost:3000/">http://localhost:3000/</a>
