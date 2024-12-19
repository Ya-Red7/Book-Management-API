const express = require('express');
const books = require('./routes/books');

app = express();
app.use(express.json());
app.use('/api/books', books);

const port = process.env.PORT || 3000;


app.listen(port, ()=> console.log(`Server runnin on port ${port}`));