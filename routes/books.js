const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.URI;
const dbName = process.env.DB_NAME; 

let db; // To store the database connection

// Connect to MongoDB
async function connectToDB() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB server
        await client.connect();
        console.log("Connected successfully to MongoDB");

        // Assign database to the global variable
        db = client.db(dbName);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit if unable to connect
    }
}

// Get Next Sequence Value
// from a collection called counters and it has a value of the last id number
async function getNextSequence(name) {
    try {
        const result = await db.collection("counter").findOne(
            { _id: name },
        );
        let cnt = result.seq+1
        await db.collection("counter").updateOne(
            { _id: name },
            {$set:{seq: cnt}}
        );
        return result.seq;
    } catch (error) { console.error("Error getting next sequence:", error); }
    
}


// Validate Book Schema
const validateBook = (book) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required(),
        author: Joi.string().min(3).max(50).required(),
        publishedYear: Joi.number().required(),
        genre: Joi.string().required(),
        available: Joi.boolean(),
    });
    return schema.validate(book);
};

// Read All Books
router.get('/', async (req, res) => {
    try {
        const books = await db.collection("books").find({}).toArray();
        res.send(books);
    } catch (error) {
        res.status(500).send("Error fetching books.");
    }
});

// Read Book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await db.collection("books").findOne({ _id: parseInt(req.params.id) });
        if (!book) return res.status(404).send('Book Not Found!');
        res.send(book);
    } catch (error) {
        res.status(500).send("Error fetching the book.");
    }
});

// Create a New Book
router.post('/', async (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const id = await getNextSequence("booksId");
    console.log("ID:", id);
    const book = {
        _id: parseInt(id),
        ...req.body};
    try {
        const result = await db.collection("books").insertOne(book);
        res.send("Book added successfully.");//\n ${JSON.stringify(result.ops[0])}
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a Book
router.put('/:id', async (req, res) => {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const result = await db.collection("books").updateOne(
            { _id: parseInt(req.params.id) },
            { $set: req.body }
        );
        if (result.matchedCount === 0) return res.status(404).send('Book Not Found!');
        res.send("Book updated successfully.");
    } catch (error) {
        res.status(500).send("Error updating the book.");
    }
});

// Delete a Book
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.collection("books").deleteOne({ _id: parseInt(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send("Book Not Found!");
        res.send("Book deleted successfully.");
    } catch (error) {
        res.status(500).send("Error deleting the book.");
    }
});

// Export the Router
module.exports = router;

// Initialize the Database Connection
connectToDB();
