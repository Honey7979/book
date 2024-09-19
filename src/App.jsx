import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation'; 
import Header from './components/Header'; 
import Home from './components/Home'; 
import Recommend from './components/Recommend'; 
import BookList from './components/BookList'; 

function App() {
  const [query, setQuery] = useState(''); 
  const [books, setBooks] = useState([]); 

  // Function to handle book search
  const handleSearch = async () => {
    if (query.trim() === '') return; 
    let apiUrl = '';

    if (query.includes(':')) {
      const [type, searchQuery] = query.split(':');
      if (type === 'author') {
        apiUrl = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchQuery}&maxResults=30`;
      } else if (type === 'genre') {
        apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${searchQuery}&maxResults=30`;
      } else {
        apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;
      }
    } else {
      apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const filteredBooks = data.items.map(book => ({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        publisher: book.volumeInfo.publisher,
        publishedDate: book.volumeInfo.publishedDate,
        thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        description: book.volumeInfo.description,
        categories: book.volumeInfo.categories || 'N/A'
      }));

      setBooks(filteredBooks);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header query={query} setQuery={setQuery} handleSearch={handleSearch} />
        <div className="app-body">
          <Navigation />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="/recommend" element={<Recommend />} /> 
              <Route path="/books/:query" element={<BookList books={books} />} /> {/* BookList route */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
