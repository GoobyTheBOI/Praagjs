const express = require('express');
const router = express.Router();
const conn = require('../util/connection');

// ! GET Retrieve all contacts
router.get('/', (req, res) => {
  conn.query('SELECT * FROM contacts', (error, results) => {
    if (error) return res.status(500).json({ error: error });

    res.json(results);
  });
});

// ! GET Retrieve single contact
router.get('/:id', (req, res) => {
  // Convert the id into a int.
  const id = parseInt(req.params.id);

  conn.query('SELECT * FROM contacts WHERE id = ?', [id], (error, results) => {
    if (error) return res.status(500).json({ error: error });

    if (results.length >= 1) {
      res.json(results[0]);
    } else {
      return res.json({
        message: 'No contact found',
      })
    }
  });
});

// ! POST
router.post('/', (req, res) => {
  // Check if all required fiels are specified
  if (!(typeof req.body.firstname !== 'undefined' && typeof req.body.lastname !== 'undefined' && typeof req.body.phone !== 'undefined' && typeof req.body.email !== 'undefined')) {
    return res.json({
      message: 'Please provide the required fields',
    });
  } else {
    // Run the SQL Query
    conn.query('INSERT INTO contacts (firstname, lastname, phone, email) VALUES (?, ?, ?, ?)', [req.body.firstname, req.body.lastname, req.body.phone, req.body.email], (error, results) => {
      if (error) return res.status(500).json({ error: error });

      return res.json({
        message: 'The contact has been created'
      })
    });
  }
});

// ! PUT
router.put('/:id', (req, res) => {
  // Check if all required fiels are specified
  if (!(typeof req.body.firstname !== 'undefined' && typeof req.body.lastname !== 'undefined' && typeof req.body.phone !== 'undefined' && typeof req.body.email !== 'undefined')) {
    return res.json({
      message: 'Please provide the required fields',
    });
  } else {
    // Convert the id into a int.
    const id = parseInt(req.params.id);

    // Run the SQL Query
    conn.query('UPDATE contacts SET firstname=?, lastname=?, phone=?, email=? WHERE id=?', [req.body.firstname, req.body.lastname, req.body.phone, req.body.email, id], (error, results) => {
      if (error) return res.status(500).json({ error: error });

      return res.json({
        message: 'The contact has been updated'
      })
    });
  }
});
// ! DELETE
router.delete('/:id', (req, res) => {
  // Convert the id into a int.
  const id = parseInt(req.params.id);

  // Run the SQL Query
  conn.query('DELETE FROM contacts WHERE id=?', [id], (error, results) => {
    if (error) return res.status(500).json({ error: error });

    return res.json({
      message: 'The contact has been removed'
    })
  });
});

module.exports = router;
