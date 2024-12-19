const express = require('express');
const router = express.Router();
const Joi = require('joi');

let books = [
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960, genre: "Fiction", available: true },
    { id: 2, title: "1984", author: "George Orwell", publishedYear: 1949, genre: "Dystopian", available: false },
    { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedYear: 1925, genre: "Fiction", available: true },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", publishedYear: 1813, genre: "Romance", available: true },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", publishedYear: 1951, genre: "Fiction", available: false },
    { id: 6, title: "Moby-Dick", author: "Herman Melville", publishedYear: 1851, genre: "Adventure", available: true },
    { id: 7, title: "War and Peace", author: "Leo Tolstoy", publishedYear: 1869, genre: "Historical Fiction", available: false },
    { id: 8, title: "The Hobbit", author: "J.R.R. Tolkien", publishedYear: 1937, genre: "Fantasy", available: true },
    { id: 9, title: "Crime and Punishment", author: "Fyodor Dostoevsky", publishedYear: 1866, genre: "Psychological Fiction", available: true },
    { id: 10, title: "The Alchemist", author: "Paulo Coelho", publishedYear: 1988, genre: "Fiction", available: false },
    { id: 11, title: "Brave New World", author: "Aldous Huxley", publishedYear: 1932, genre: "Dystopian", available: true },
    { id: 12, title: "The Road", author: "Cormac McCarthy", publishedYear: 2006, genre: "Post-Apocalyptic", available: false },
    { id: 13, title: "Jane Eyre", author: "Charlotte Brontë", publishedYear: 1847, genre: "Gothic Fiction", available: true },
    { id: 14, title: "The Book Thief", author: "Markus Zusak", publishedYear: 2005, genre: "Historical Fiction", available: true },
    { id: 15, title: "Fahrenheit 451", author: "Ray Bradbury", publishedYear: 1953, genre: "Dystopian", available: false },
    { id: 16, title: "The Kite Runner", author: "Khaled Hosseini", publishedYear: 2003, genre: "Fiction", available: true },
    { id: 17, title: "The Lord of the Rings", author: "J.R.R. Tolkien", publishedYear: 1954, genre: "Fantasy", available: true },
    { id: 18, title: "A Tale of Two Cities", author: "Charles Dickens", publishedYear: 1859, genre: "Historical Fiction", available: false },
    { id: 19, title: "The Da Vinci Code", author: "Dan Brown", publishedYear: 2003, genre: "Thriller", available: true },
    { id: 20, title: "Life of Pi", author: "Yann Martel", publishedYear: 2001, genre: "Adventure", available: false },
];

const validateBook = (book)=> {
    const scheme = Joi.object({
        title: Joi.string().min(3).max(100).required(),
        author: Joi.string().min(3).max(50).required(),
        publishedYear: Joi.number().required(),
        genre: Joi.string().required(),
        available: Joi.boolean(),
    });
    return scheme.validate(book);
}

//Read
router.get('/', (req,res) =>{
    res.send(books);
});

//Read by ID
router.get('/:id', (req,res) =>{
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) return res.status(404).send('Book Not Found!');

    res.send(book);
});

//Create
router.post('/', (req,res) =>{
    const {error} = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = {
        id: books.length+1,
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
        genre: req.body.genre,
        available: req.body.available,
    };
    books.push(book);
    res.send(`Book added successfully.\n ${JSON.stringify(book)}`);
});

//Update
router.put('/:id', (req,res) =>{
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) return res.status(404).send('Book Not Found!');
    
    const {error} = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    Object.assign(book, req.body);
    res.send(`Book Updated Successfully.\n ${JSON.stringify(book)}`);
});

//Delete
router.delete('/:id', (req,res)=>{
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if(bookIndex === -1) return res.status(404).send("Book Not Found");

    const deletedBook = books.splice(bookIndex, 1);
    res.send(`Deleted Book -\n ${JSON.stringify(deletedBook[0])}`);
});

module.exports = router;