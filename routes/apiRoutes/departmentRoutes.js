const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
 
    router.get('/departments', (req,res) => {
        const sql = `SELECT * FROM department`;
    
        db.query(sql, (err, rows) => {
            if(err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                data: rows
            });
            console.table(rows);
        });
    });

    router.post('/departments', ({body}, res) => {
 
        const sql = `INSERT INTO department (name)
                        VALUES (?)`
        const params = body.name;

        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: body
            });
        });
    })

    router.delete('/departments/:id', (req,res) => {
        const sql = `DELETE FROM department WHERE id = ?`;
        const params = [req.params.id];
        db.query(sql, params, (err,result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                //checks if anything was deleted 
            } else if (!result.affectedRows) {
                res,json({
                    message: 'department not found'
                });
            } else {
                res.json({
                   message: 'deleted',
                   changes: result.affectedRows,
                   id: req.params.id 
                });
            }
        });
    });

module.exports = router;
