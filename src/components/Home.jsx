import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/recommend.module.css'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.recommend} onClick={() => navigate('/recommend')}>
        <img
          src="src/assets/istockphoto-831651876-612x612.jpg"
          alt="Recommended"
          className={styles.recommendImage}
        />
        <p className={styles.caption}>Click on the books for our recommendations</p>
      </div>
    </div>
  );
}

export default Home;
