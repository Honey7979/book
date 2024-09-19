import React, { useState, useEffect } from 'react';
import styles from '../css/recommend.module.css'; // Adjust the path if necessary

const Recommend = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(0); 
  const booksPerPage = 7; 

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      setLoading(true);
      try {
        const startIndex = (currentPage - 1) * booksPerPage;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:romance+thriller&startIndex=${startIndex}&maxResults=${booksPerPage}`);
        const data = await response.json();

        const filteredBooks = data.items.map(book => ({
          id: book.id,
          title: book.volumeInfo.title,
          thumbnail: book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
        }));

        setRecommendedBooks(filteredBooks);
        setTotalPages(Math.ceil(data.totalItems / booksPerPage)); 
      } catch (error) {
        console.error('Error fetching recommended books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedBooks();
  }, [currentPage]); 

  // Pagination 
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles.gridOverlay}>
      <button className={styles.closeButton} onClick={() => window.history.back()}>Close</button>
      <div className={styles.gridContainer}>
        <h2>Recommended Books</h2>
        {loading ? (
          <p>Loading recommended books...</p>
        ) : (
          <>
            <div className={styles.bookGrid}>
              {recommendedBooks.map((book) => (
                <div key={book.id} className={styles.bookCard}>
                  <img src={book.thumbnail} alt={book.title} className={styles.bookImage} />
                  <h3>{book.title}</h3>
                </div>
              ))}
            </div>

            <div className={styles.pagination}>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Recommend;
