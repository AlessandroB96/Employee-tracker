const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const fs = require('fs');
const prompt = require('./index');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use apiRoutes
app.use('/api', apiRoutes);

//Start server
db.connect(err => {
    if (err) {
        console.log('Database NOT connected');
        throw err;
    } 

    app.listen(PORT, () => {
        console.log('\n');
        console.log(`server now running on http://localhost:${PORT}`);
    })
});