import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate if using react-router for navigation
import styles from '../css/bookList.module.css'; 

function BookList({ books }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null); 
  const booksPerPage = 5; 
  const navigate = useNavigate(); 

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewReview = (book) => {
    setSelectedBook(book); s
  };

  const handleBackToList = () => {
    setSelectedBook(null); 
  };

  const handleBackToHome = () => {
    navigate('/'); 
  };

  // Detailed book view
  if (selectedBook) {
    return (
      <div className={styles.bookDetails}>
        <button onClick={handleBackToList} className={styles.backButton}>
          Back to List
        </button>
        <div className={styles.bookDetailCard}>
          <img src={selectedBook.thumbnail} alt={selectedBook.title} className={styles.bookImage} />
          <h3>{selectedBook.title}</h3>
          <p><strong>Authors:</strong> {selectedBook.authors ? selectedBook.authors.join(', ') : 'N/A'}</p>
          <p><strong>Publisher:</strong> {selectedBook.publisher}</p>
          <p><strong>Published Date:</strong> {selectedBook.publishedDate}</p>
          <p><strong>Description:</strong> {selectedBook.description ? selectedBook.description : 'No description available.'}</p>
          <p><strong>Page Count:</strong> {selectedBook.pageCount}</p>
          <p><strong>Categories:</strong> {selectedBook.categories ? selectedBook.categories.join(', ') : 'N/A'}</p>
          <p><strong>Average Rating:</strong> {selectedBook.averageRating ? selectedBook.averageRating : 'Not Rated'}</p>
          <p><strong>Language:</strong> {selectedBook.language}</p>
          <p><strong>Maturity Rating:</strong> {selectedBook.maturityRating}</p>
          <p><strong>Print Type:</strong> {selectedBook.printType}</p>

          <div className={styles.bookActions}>
            {selectedBook.accessInfo?.webReaderLink ? (
              <>
                <a href={selectedBook.accessInfo.webReaderLink} target="_blank" rel="noopener noreferrer">
                  <button className={styles.readButton}>Read Book</button>
                </a>
                {selectedBook.accessInfo?.pdf?.isAvailable && (
                  <a href={selectedBook.accessInfo.webReaderLink} target="_blank" rel="noopener noreferrer">
                    <button className={styles.downloadButton}>Download PDF</button>
                  </a>
                )}
              </>
            ) : (
              <p>No online reader or download available.</p>
            )}
          </div>

          {selectedBook.saleInfo?.saleability === 'FOR_SALE' && (
            <div>
              <p><strong>Price:</strong> {selectedBook.saleInfo.listPrice.amount} {selectedBook.saleInfo.listPrice.currencyCode}</p>
              <a href={selectedBook.saleInfo.buyLink} target="_blank" rel="noopener noreferrer">
                <button className={styles.buyButton}>Buy Book</button>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // book list view
  return (
    <div>
      <div className={styles.homeButtonContainer}>
        <button onClick={handleBackToHome} className={styles.homeButton}>
          Back to Home
        </button>
      </div>

      <div className={styles.gridContainer}>
        {currentBooks.length > 0 ? (
          <div className={styles.bookGrid}>
            {currentBooks.map(book => (
              <div key={book.id} className={styles.bookCard}>
                <img src={book.thumbnail} alt={book.title} className={styles.bookImage} />
                <h5>{book.title}</h5>
                <p>Authors: {book.authors ? book.authors.join(', ') : 'N/A'}</p>
                <p>Publisher: {book.publisher}</p>
                <p>Published Date: {book.publishedDate}</p>
                <p>Description: {book.description ? book.description : 'No description available.'}</p>
                <button 
                  className={styles.reviewButton} 
                  onClick={() => handleViewReview(book)}>
                  View Review
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No books found. Try searching for something else!</p>
        )}
      </div>

      <div className={styles.paginationControls}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default BookList;
