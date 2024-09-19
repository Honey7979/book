import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/recommend.module.css'; 
import homeImage from '../assets/home.jpeg'; // Adjust the path if necessary

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.recommend} onClick={() => navigate('/recommend')}>
        <img
          src={homeImage} // Use the imported image here
          alt="Recommended"
          className={styles.recommendImage}
        />
        <p className={styles.caption}>Click on the books for our recommendations</p>
      </div>
    </div>
  );
}

export default Home;
