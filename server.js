import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/getMovies', (req, res) => {
    let connection = mysql.createConnection(config);
    let query = `SELECT * FROM movies`
  
    connection.query(query, (error, results) => {
        if (error) {
            return console.log(error.message);
        }
        res.send({ express: JSON.stringify(results) });
    });

    connection.end();
});

app.post('/api/addReview', (req, res) => {
	var {reviewTitle, reviewContent, movieID, reviewScore, userId} = req.body;
	var query = 'INSERT INTO review (reviewTitle, reviewContent, reviewScore, movieID, userID) VALUES (?, ?, ?, ?, ?)';
	var vars = [reviewTitle, reviewContent, reviewScore, movieID, userId];
	
	let connection = mysql.createConnection(config);
	
	connection.query(query, vars, (error, results) => {
	  if (error) {
		console.error(error);
		return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
	  }
	  res.status(200).json({ status: 'ok', data: 'Review Added' });
	});
	connection.end();
  });
  
app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server