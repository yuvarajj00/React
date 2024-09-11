const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI = 'mongodb+srv://hm6627355:sATdgNUBFBdfOEiK@cluster0.4syt4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define schema and model for registration
const RegistrationSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  phoneNo: String,
  education: String
});

const Registration = mongoose.model('Registration', RegistrationSchema);

// API route to handle registration form submission
app.post('/register', (req, res) => {
  const newRegistration = new Registration({
    name: req.body.name,
    rollNo: req.body.rollNo,
    phoneNo: req.body.phoneNo,
    education: req.body.education
  });

  newRegistration.save()
    .then(() => res.status(200).json({ message: 'Registration saved!' }))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Add the search route to handle search queries for names
app.get('/search', async (req, res) => {
    const searchQuery = req.query.name;
  
    try {
      // Search for names in the Registration collection that contain the searchQuery (case insensitive)
      const results = await Registration.find({ name: { $regex: searchQuery, $options: 'i' } });
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
