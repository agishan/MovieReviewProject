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

app.post('/api/searchMovies', (req, res) => {
    let connection = mysql.createConnection(config);

	const { movieName, directorName, actorName } = req.body;

    // Prepare search criteria
    let searchCriteria = [];
    let params = [];
    if (movieName) {
        searchCriteria.push("m.name LIKE ?");
        params.push(`%${movieName}%`);
    }
    if (directorName) {
        let [directorFirstName, directorLastName] = directorName.split(' ');
        if (directorLastName) {
            searchCriteria.push("(d.first_name LIKE ? AND d.last_name LIKE ?)");
            params.push(`%${directorFirstName}%`, `%${directorLastName}%`);
        } else {
            searchCriteria.push("(d.first_name LIKE ? OR d.last_name LIKE ?)");
            params.push(`%${directorFirstName}%`, `%${directorFirstName}%`);
        }
    }
    if (actorName) {
        let [actorFirstName, actorLastName] = actorName.split(' ');
        if (actorLastName) {
            searchCriteria.push("(a.first_name LIKE ? AND a.last_name LIKE ?)");
            params.push(`%${actorFirstName}%`, `%${actorLastName}%`);
        } else {
            searchCriteria.push("(a.first_name LIKE ? OR a.last_name LIKE ?)");
            params.push(`%${actorFirstName}%`, `%${actorFirstName}%`);
        }
    }

    let query = `
		SELECT 
			m.name AS movie_name,
			GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ', d.last_name) SEPARATOR ', ') AS directors,
			GROUP_CONCAT(DISTINCT re.reviewContent SEPARATOR '||') AS review_contents,
			AVG(re.reviewScore) As average_review_score
		FROM 
			movies m
		JOIN 
			movies_directors md ON md.movie_id = m.id
		JOIN 
			directors d ON d.id = md.director_id
		LEFT JOIN 
			Review re ON re.movieID = m.id
		JOIN 
			roles ro ON ro.movie_id = m.id
		JOIN 
			actors a ON a.id = ro.actor_id
		${searchCriteria.length > 0 ? `WHERE ${searchCriteria.join(' AND ')}` : ''}
		GROUP BY 
			m.id
		`

    connection.query(query, params, (error, results) => {
        if (error) {
            console.error(error.message);
            res.status(500).json({ error: error.toString() }); 
            return;
        }
        res.json(results);
    });

    connection.end();
});

app.get('/api/topDirectors', (req, res) => {
    let connection = mysql.createConnection(config);

    let query = `
        SELECT 
            CONCAT(d.first_name, ' ', d.last_name) AS director_name,
            AVG(re.reviewScore) AS average_review_score
        FROM 
            directors d
        JOIN 
            movies_directors md ON d.id = md.director_id
        JOIN 
            movies m ON md.movie_id = m.id
        LEFT JOIN 
            Review re ON re.movieID = m.id
        GROUP BY 
            d.id
        ORDER BY
            average_review_score DESC
        LIMIT 10
        `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error(error.message);
            res.status(500).json({ error: error.toString() }); // send error in JSON format
            return;
        }
        res.json(results);
    });

    connection.end();
});

app.get('/api/topActors', (req, res) => {
    let connection = mysql.createConnection(config);

    let query = `
        SELECT 
            CONCAT(a.first_name, ' ', a.last_name) AS actor_name,
            AVG(re.reviewScore) AS average_review_score
        FROM 
            actors a
        JOIN 
            roles ro ON a.id = ro.actor_id
        JOIN 
            movies m ON ro.movie_id = m.id
        LEFT JOIN 
            Review re ON re.movieID = m.id
        GROUP BY 
            a.id
        ORDER BY
            average_review_score DESC
        LIMIT 10
        `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error(error.message);
            res.status(500).json({ error: error.toString() }); // send error in JSON format
            return;
        }
        res.json(results);
    });

    connection.end();
});

app.get('/api/topMovies', (req, res) => {
    let connection = mysql.createConnection(config);

    let query = `
        SELECT 
            m.name AS movie_name,
            GROUP_CONCAT(DISTINCT CONCAT(d.first_name, ' ', d.last_name) SEPARATOR ', ') AS directors,
            AVG(re.reviewScore) As average_review_score
        FROM 
            movies m
        JOIN 
            movies_directors md ON md.movie_id = m.id
        JOIN 
            directors d ON d.id = md.director_id
        LEFT JOIN 
            Review re ON re.movieID = m.id
        GROUP BY 
            m.id
        ORDER BY
            average_review_score DESC
        LIMIT 10
        `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error(error.message);
            res.status(500).json({ error: error.toString() }); // send error in JSON format
            return;
        }
        res.json(results);
    });

    connection.end();
});






app.post('/api/addReview', (req, res) => {
	var {reviewTitle, reviewContent, movieID, reviewScore, userId} = req.body;
	var query = 'INSERT INTO Review (reviewTitle, reviewContent, reviewScore, movieID, userID) VALUES (?, ?, ?, ?, ?)';
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

  app.post('/api/deleteFromWatchList', (req, res) => {
    let connection = mysql.createConnection(config);

    let query = `
        DELETE FROM MovieWatchList 
        WHERE userID = ? AND movieID = ?
    `;

    connection.query(query, [req.body.userID, req.body.movieID], (error, results) => {
        if (error) {
            console.error(error.message);
            res.status(500).json({ error: error.toString() });
            return;
        }
        res.json({ message: "Movie removed from watch list successfully" });
    });

    connection.end();
});

app.post('/api/viewWatchList', (req, res) => {
    let connection = mysql.createConnection(config);

    let query = `
    SELECT m.id AS id, m.name AS name
    FROM MovieWatchList mw
    JOIN movies m ON mw.movieID = m.id
    WHERE mw.userID = ?
    `;

    connection.query(query, [req.body.userID], (error, results) => {
        if (error) {
            console.error(error.message);
            res.status(500).json({ error: error.toString() });
            return;
        }
        res.json(results);
    });

    connection.end();
});

app.post('/api/addToWatchList', (req, res) => {
    let connection = mysql.createConnection(config);

    let query = `
        INSERT INTO MovieWatchList (userID, movieID)
        VALUES (?, ?)
    `;

    connection.query(query, [req.body.userID, req.body.movieID], (error, results) => {
        if (error) {
            console.error(error.message);
            res.status(500).json({ error: error.toString() });
            return;
        }
        res.json({ message: "Movie added to watch list successfully" });
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