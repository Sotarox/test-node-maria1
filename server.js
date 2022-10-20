const express = require('express')
const bodyParser = require('body-parser')
const pool = require('./db')
const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

// expose an endpoint "people"
app.get('/people', async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await pool.getConnection();

        // create a new query
        let query = "select * from people";
        console.log("Received HTTPGet request");

        // execute the query and set the result to a new variable
        let rows = await conn.query(query);

        // return the results
        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

app.post('/ins', async (req, res) => {
    let conn;
    const jsonbody = req.body;
    console.log(jsonbody)
    try {
        conn = await pool.getConnection();
        const result = await conn.query("INSERT INTO `people` (name) VALUES (?)", [jsonbody.name]);
        console.log("insert done result:", result)
        // res.send(result);
        // TODO: insert works by curl but doesn't exit. We need to kill process by Ctrl+C: 
        // curl -H "Content-Type: application/json" -X POST -d '{"name":"Chris"}' http://localhost:8080/ins
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
        // conn.end();
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));