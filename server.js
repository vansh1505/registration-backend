const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

// Middleware to parse incoming requests as JSON
app.use(bodyParser.json());

// MongoDB connection string
const uri = "mongodb+srv://vansh:vansh123@vansh.xfgyxje.mongodb.net/?retryWrites=true&w=majority";

// Database and Collection Names
const dbName = 'TAG-Registration';
const collectionName = 'User-data';

// Route to handle form submission from Google Apps Script
app.post('/submit-form', async (req, res) => {
  const formData = req.body.data;

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert form data into MongoDB
    await collection.insertOne(formData);

    // Respond with success message
    res.status(200).send({ message: 'Data successfully inserted into MongoDB!' });

    // Close the connection
    client.close();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).send({ message: 'Error inserting data into MongoDB' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
