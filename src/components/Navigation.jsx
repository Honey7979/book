import React from 'react';
import styles from '../css/navigation.module.css'; // Import the CSS module

function Navigation() {
  return (
    <div className={styles.navContainer}>
      <ul className={styles.navList}>
        <li>Home</li>
        <li>Books</li>
        <li>Members</li>
        <li>Borrowings</li>
        <li>Returns</li>
        <li>Reports</li>
        <li>Settings</li>
        <li>Contact Us</li>
        <li>FAQ</li>
        <li>About Us</li>
        <li>My Account</li>
        <li>Recommendations</li>
        <li>Book Reservations</li>
      </ul>
    </div>
  );
}

export default Navigation;
