const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./books.db'); // Using a file-based SQLite database

app.use(bodyParser.json());

// Create tables if they don't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT, author TEXT, description TEXT, image_url TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS reviews (id INTEGER PRIMARY KEY, book_id INTEGER, rating INTEGER, comment TEXT)");

    // Sample data (only if the table is empty)
    db.get("SELECT COUNT(*) AS count FROM books", (err, row) => {
        if (row.count === 0) {
            const books = [
                { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A novel about the American dream...", image_url: "url_to_image" },
                { id: 2, title: "1984", author: "George Orwell", description: "A dystopian social science fiction novel...", image_url: "url_to_image" }
            ];

            const stmt = db.prepare("INSERT INTO books (id, title, author, description, image_url) VALUES (?, ?, ?, ?, ?)");
            books.forEach(book => {
                stmt.run(book.id, book.title, book.author, book.description, book.image_url);
            });
            stmt.finalize();
        }
    });
});

// API Endpoints
app.get('/books', (req, res) => {
    db.all("SELECT * FROM books", [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM books WHERE id = ?", [id], (err, book) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (!book) {
            res.status(404).send('Book not found');
        } else {
            db.all("SELECT rating, comment FROM reviews WHERE book_id = ?", [id], (err, reviews) => {
                res.json({ ...book, reviews });
            });
        }
    });
});

app.post('/books/:id/reviews', (req, res) => {
    const id = req.params.id;
    const { rating, comment } = req.body;
    db.run("INSERT INTO reviews (book_id, rating, comment) VALUES (?, ?, ?)", [id, rating, comment], (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).json({ message: "Review submitted successfully!" });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
