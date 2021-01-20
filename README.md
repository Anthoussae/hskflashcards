"# hskflashcards" 

Steps to get Heroku to host a Javascript project:

1) make a new project on Heroku. Give it a name.
2) Select Deployment Method > Github.
3) Go to github and create a new repository. To do this, follow the instructions it gives you in the terminal/Command Prompt. You will need to cd into a project folder to start this step.
    3b) reminder: 'dir' tells you what's in your current location. (ls in mac) 'cd'  is used to navigate to a folder.
4) Open your folder in VScode (or equivalent)
    5b) your folder right now will only contain a README.md
5) create three files with the following content:
    6b) Procfile (Note: Procfile has no extension.)
        web: node server.js
    6d) package.json
        {"engines":{"node":"12.x"}}
    6e) server.js
        any javascript you like; perhaps a console log to check that it's working.
6) Commit everything to git. Go back to Command Prompt and navigate to the folder.
7) type:
    8a) git add .
    8b) git commit -m "message about commitment"
    8c) git push
8) you can also use "git status" to check how things are going.
9) Connect Heroku to your new github repository ("Repo").
10) Now that we are connected to the github repo, enable "automatic update / automatic deploy" or whatever it's called in Heroku.
11) Go to server.js, and add the following code:
     const dotenv = require("dotenv");
     const express = require("express");
     dotenv.config()
     const app = express();
     app.use(express.static("public"));
     const port = process.env.PORT;
     app.listen(port,()=>console.log("listening"));
12) install express. To do this, go to Command Prompt, go to root directory, and type "npm install express"
13) create a file named ".env". Add the text: PORT=3000
    13a) Files that start with a "." are hidden, and won't appear in finder.
14) create a file named ".gitignore". Add the text:

.env
node_modules

15) Create a folder called public in the root directory. Any file in this folder will be publically visible via heroku hosting.
16) put your code in your public folder (traditionally an HTML, css, and a js file)

17) go to the command line and navigate to your root folder, then type:

npm install dotenv

18) push everything up to github, using Command Prompt as usual:

git add .
git commit -m "mymessage"
git push

19) you should now be able to open and view your app on Heroku.

20) Now let's enable delicious cookie functionality. Go to root folder, and type:

npm install js-cookie

21) In the <head> tag of your html, add the following:
<script src="https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js"></script>

22) Somewhere at the start of your js file, paste:
    Cookies.set('key', 'value');

    22b) Henceforth, you can 'get' and 'set' cookies. The syntax looks like this:
            let variableName = +Cookies.get("keyName") || 0;
            Cookies.set("keyName", 'value');
    22c) Note that cookies are always strings, so you may need to numerify them (hence the "+").
    22d) If you attempt to 'get' a nonexistent key, the syntax above (with the OR operator ||) will generate a value for it (in this case, 0) and write it to the cookie. Otherwise it will retrieve the value of the key as normal. Remember that it'll be saved as a string.

 ------------- creating a database and managing data using MongoDB--------------


1) Create an account on MongoDB
2) Create a "New Project"
3) give it a name.
4) select 'create Project'
5) select 'build a cluster'
6) choose free version.
7) select settings, 'create cluster'
8) wait for it to be created.
9) select 'connect'
10) select 'allow access from anywhere' in the 'add a connection IP address' tab.
11) Create a database user account + password

12) choose a connection method: select 'connect your application'.

13) copy the connection string. Something like: mongodb+srv://HSKflashcardsAdmin:<password>@cluster0.qmuc9.mongodb.net/<dbname>?retryWrites=true&w=majority

14) Collections > add my own data

15) Give your database and collection a name. Be careful about naming your database and collections, as it needs to exactly match your models file, described below.

16) navigate to server.js in the root folder. After everything, paste this:

app.get('/api/records', (req, res) => {
	Record.find({})
		.then(records => {
			res.json(records);
		})
		.catch(reason => {
			res.status(500).json(reason);
		});
});

17) You may need to navigate to your root folder in cmd and type:

npm run start

18) then, in your browser, navigate to: 

localhost:3000

19) as an alternative way of running your program (unlike live-server, express is javascript that acts as the server). instead of using live-server, npm run start is a better alternative.

19b) in the terminal, CTRL+C terminates a process.

20) navigate to the root directory of your project. Create a new folder named models.

21) Create a new JS file inside this folder. This file will describe a single entry in your database's collection.

21b) The file must also require the Mongoose wrapper for interacting with MongoDB. For example, the file might look like this:

const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

const TestResultSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	numberOfTestsTaken: {
		type: Number,
		required: true
	},
	averageTestResult: {
		type: Number,
		required: true
    },
    failedCharacters: [{
        type: String,
        required: false
    }]
});

module.exports = mongoose.model('TestResult', TestResultSchema);

22) navigate to your root folder, and type (in cmd):
npm install mongoose

23) go to server.js and paste the code below (TestResult below corresponds to the nomenclature in your models file. Ensure that all your nomenclature lines up correctly.):

const TestResult = require("./models/TestResult");

Edit the final lines of your server.js file like below. Note that we have changed the word Record and records for TestResult and testResults respectively.

app.get('/api/records', (req, res) => {
	TestResult.find({})
		.then(testResults => {
			res.json(testResults);
		})
		.catch(reason => {
			res.status(500).json(reason);
    	});
});

24) Underneath your requires in server.js, paste:

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
});
mongoose.connection.on('error', err => console.error('MongoDB connection error:', err));

25) navigate to your .env file. Underneath the PORT=3000, type:

MONGODB_URI= (your connection string without brackets)

26) then edit your connection string removing placeholders signified by <> (remove the <> also). MongoDB requires your password and your database name which you declared earlier.

27) Add this line in server.js: 

const mongoose = require("mongoose");

28) You will need to rearrange your server.js file. Make sure that all the 'requires' are at the  top, as well as dotenv.config().

29) Beneath everything in your server.js file, paste:


app.post('/api/records', (req, res) => {
	const testResult = new TestResult(req.body);

	testResult.save()
		.then(testResultData => {
			res.json(testResultData);
		})
		.catch(reason => {
			res.status(500).json(reason);
		});
});

 ---- pick it up from here ----