const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Gig Model
const Gig = require('../../models/Gig');


// Get gig list
router.get('/', (req, res) => {
  Gig.find()
    .then(gigs => {
      res.json(gigs);
    })
    .catch(err => res.status(404).json(err));
});

// // Display add gig form
// router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {

  let { title, technologies, budget, description, contact_email } = req.body;

  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({ text: 'Please add a Gig Title' });
  }

  if (!technologies) {
    errors.push({ text: 'Please add some Technologies' });
  }

  if (!description) {
    errors.push({ text: 'Please add a Description' });
  }

  if (!contact_email) {
    errors.push({ text: 'Please add a Contact Email' });
  }

  // Check for errors
  if (errors.length > 0) {

    return res.status(400).json(errors);

  } else {

    // costumized budget
    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',');
    let technologiesArray = technologies.split(',');

    const newGig = {
      title,
      technologies: technologiesArray,
      budget,
      description,
      contact_email
    };

    // Insert into table
    new Gig(newGig)
      .save()
      .then(gig => res.json(gig))
      .catch(err => console.log(err));
  }
});

// Search for gigs
router.get('/search/:searchItem', (req, res) => {
  let term = req.params.searchItem;

  // Make lowercase
  term = term.toLowerCase();

  Gig.find({ technologies: term })
    .then(gigs => {
      res.json(gigs);
    })
    .catch(err => console.log(err));
});


module.exports = router;