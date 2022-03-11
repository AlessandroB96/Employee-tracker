const express = require('express');
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Start server
db.connect(err => {
    if (err) {
        console.log('Database NOT connected');
        throw err;
    } 

    app.listen(PORT, () => {
        console.log(`server now running on http://localhost:${PORT}`);
    })
});