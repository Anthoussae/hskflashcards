const TestResult = require("./models/TestResult");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
});
mongoose.connection.on('error', err => console.error('MongoDB connection error:', err));
const app = express();
app.use(express.static("public"));
const port = process.env.PORT;
app.listen(port,()=>console.log("listening"));
app.get('/api/records', (req, res) => {
	TestResult.find({})
		.then(testResults => {
            console.log(testResults);
			res.json(testResults);
		})
		.catch(reason => {
			res.status(500).json(reason);
    	});
});
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