const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem'); // Import the MenuItem model

router.post('/', async (req, res) => {
  try{
    const data = req.body; // Assuming the request body contains the menu item data
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("Menu item saved");
    res.status(200).json(response);
  } catch (error) {
    console.error("Error saving menu item:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/', async (req, res) => {
  try{
    const data = await MenuItem.find();
    console.log("Menu items fetched");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:taste_type', async (req, res) => {
  try{
    const taste_Type = req.params.taste_type; // Extract taste_Type from URL parameters
    if(taste_Type == 'spicy' || taste_Type == 'sweet' || taste_Type == 'sour'){
      const response = await MenuItem.find({ taste: taste_Type });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: 'Invalid taste_Type parameter' });
    }
  } catch (error) {
    console.error("Error fetching menu item by taste_Type:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;