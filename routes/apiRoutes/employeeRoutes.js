const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/employees', (req,res) => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.statusCode(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

router.post('/employees', ({body}, res) => {
 
    const sql = `INSERT INTO employee (first_name, last_name, role_id)
                    VALUES (?,?,?)`
    const params = [body.first_name, body.last_name, body.role_id];

    db.query(sql, params, (err) => {
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

//update employee role
router.put('/employees/:id', (req, res) => {
 
    const sql = `UPDATE employee SET role_id = ?
                    WHERE id = ?`;
    const params = [req.params.id, req.body.role_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate Not Found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
})

//delete an employee
router.delete('/employees/:id', (req, res) => {
 
    const sql = `DELETE FROM employee WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: 'employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id 
            });
        }    
    });
})

module.exports = router;