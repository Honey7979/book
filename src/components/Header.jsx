import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/header.module.css'; 

function Header({ query, setQuery, handleSearch }) {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('book'); 

  const onSearch = () => {
    handleSearch(); 
    navigate(`/books/${searchType}:${query}`); 
    setQuery(''); 
  };

  const handleTypeChange = (type) => {
    setSearchType(type);
    let sampleQuery = '';
    switch (type) {
      case 'author':
        sampleQuery = 'keyes'; 
        break;
      case 'genre':
        sampleQuery = 'fiction'; 
        break;
      case 'book':
      default:
        sampleQuery = 'Harry potter'; 
        break;
    }
    setQuery(sampleQuery);
  };

  return (
    <>
      <div className={styles.nameContainer}>
        <h1>Book Hub</h1>
      </div>
      
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logoContainer}>
            <img src="src/assets/images (1).jpeg" alt="Library Logo" className={styles.logoImage} />
          </div>
        </div>
        <div className={styles.headerRight}>
          <select 
            value={searchType} 
            onChange={(e) => handleTypeChange(e.target.value)} 
            className={styles.dropdown}
          >
            <option value="book">Search by Book Name</option>
            <option value="author">Search by Author</option>
            <option value="genre">Search by Genre</option>
          </select>

          <input
            type="text"
            placeholder="Enter your search query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchBar}
          />
          
          <button onClick={onSearch} className={styles.searchButton}>
            Search
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
