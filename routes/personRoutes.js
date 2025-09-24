const express = require('express');
const router = express.Router();
const Person = require('./../models/person'); // Import the Person model


// POST route to add a person
router.post('/', async (req, res) => {
  try{
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new Person to the database
    const response = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response);

  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get method to get the person
router.get('/', async (req, res) => {
  try{
    const data = await Person.find(); // Fetch all persons from the database 
    console.log("Data fetched");
    res.status(200).json(data);
  } catch(error) {
      console.log("Error fetching data:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:workType', async (req, res) => {
  try{
    const workType = req.params.workType; // Extract workType from URL parameters
    if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
      const response = await Person.find({ work: workType });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: 'Invalid workType parameter' });
    }
  } catch (error) {
    console.error("Error fetching person by workType:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract person ID from URL parameters
        const updatePersonData = req.body; // Assuming the request body contains the updated data

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, { 
            new: true,
            runValidators: true // Run mongoose validation
        });
        if(!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log("Data updated");
        res.status(200).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract person ID from URL parameters
        const deletedPerson = await Person.findByIdAndDelete(personId);
        if (!deletedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log("Person deleted");
        res.status(200).json({message: "Person deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = router;