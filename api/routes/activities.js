const express = require('express');
const router = express.Router();
const conn = require('../util/connection');

// ! GET Retrieve all activities
router.get('/', (req, res) => {
  conn.query('SELECT * FROM activities', (error, results) => {
    if (error) return res.status(500).json({ error: error });

    res.json(results);
  });
});

// ! GET Retrieve all dates
router.get('/dates', (req, res) => {
  conn.query('SELECT DISTINCT DATE_FORMAT(date, \'%m-%d-%Y\') as "date" FROM activities', (error, results) => {
    if (error) return res.status(500).json({ error: error });

    const dateArray = results.map((result) => result.date);

    if (results.length >= 1) {
      res.json(dateArray);
    } else {
      return res.json({
        message: 'No dates found',
      })
    }
  });
});

// ! GET Date -> YEAR-MONTH-DAY -> 2020-04-15
router.get('/:date', (req, res) => {
  const regex = RegExp(/\d{4}-\d{2}-\d{2}/);
  const date = req.params.date;

  if (regex.test(date)) {
    conn.query('SELECT id, DATE_FORMAT(date, \'%m-%d-%Y\') as "date", title, description, maps FROM activities WHERE date = ?', [date], (error, results) => {
      if (error) return res.status(500).json({ error: error });

      if (results.length >= 1) {
        return res.json(results);
      } else {
        return res.json({
          message: 'No activity found',
        })
      }
    });
  } else {
    conn.query('SELECT id, DATE_FORMAT(date, \'%m-%d-%Y\') as "date", title, description, maps FROM activities WHERE id = ?', [date], (error, results) => {
    if (error) return res.status(500).json({ error: error });

    if (results.length >= 1) {
      return res.json(results);
    } else {
      return res.json({
        message: 'No activity found',
      })
    }
  });
  }
});

// ! POST
router.post('/', (req, res) => {
  // Check if all required fiels are specified
  if (!(typeof req.body.date !== 'undefined' && typeof req.body.title !== 'undefined' && typeof req.body.description !== 'undefined' && typeof req.body.maps !== 'undefined')) {
    return res.json({
      message: 'Please provide the required fields',
    });
  } else {
    // Check is the date format is specified correctly
    const regex = RegExp(/\d{4}-\d{2}-\d{2}/);
    const date = req.body.date;

    if (!regex.test(date)) {
      return res.json({
        message: 'No valid date specified',
      })
    }

    // Run the SQL Query
    conn.query('INSERT INTO activities (date, title, description, maps) VALUES (?, ?, ?, ?)', [req.body.date, req.body.title, req.body.description, req.body.maps], (error, results) => {
      if (error) return res.status(500).json({ error: error });

      return res.json({
        message: 'The activity has been created'
      })
    });
  }
});

// ! PUT
router.put('/:id', (req, res) => {
  // Check if all required fiels are specified
  if (!(typeof req.body.date !== 'undefined' && typeof req.body.title !== 'undefined' && typeof req.body.description !== 'undefined' && typeof req.body.maps !== 'undefined')) {
    return res.json({
      message: 'Please provide the required fields',
    });
  } else {
    // Check is the date format is specified correctly
    const regex = RegExp(/\d{4}-\d{2}-\d{2}/);
    const date = req.body.date;

    if (!regex.test(date)) {
      return res.json({
        message: 'No valid date specified',
      })
    }

    // Convert the id into a int.
    const id = parseInt(req.params.id);

    // Run the SQL Query
    conn.query('UPDATE activities SET date=?, title=?, description=?, maps=? WHERE id=?', [req.body.date, req.body.title, req.body.description, req.body.maps, id], (error, results) => {
      if (error) return res.status(500).json({ error: error });

      return res.json({
        message: 'The activity has been updated'
      })
    });
  }
});

// ! DELETE
router.delete('/:id', (req, res) => {
  // Convert the id into a int.
  const id = parseInt(req.params.id);

  // Run the SQL Query
  conn.query('DELETE FROM activities WHERE id=?', [id], (error, results) => {
    if (error) return res.status(500).json({ error: error });

    return res.json({
      message: 'The activity has been removed'
    })
  });
});

module.exports = router;
