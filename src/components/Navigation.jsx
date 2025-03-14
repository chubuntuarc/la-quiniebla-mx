import styles from '../styles/Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <button className={`${styles.navButton} ${styles.active}`}>
        <img src="/home-icon.svg" alt="Home" />
        Home
      </button>
      <button className={styles.navButton}>
        <img src="/trophy-icon.svg" alt="Trophy" />
      </button>
      <button className={styles.navButton}>
        <img src="/calendar-icon.svg" alt="Calendar" />
      </button>
      <button className={styles.navButton}>
        <img src="/menu-icon.svg" alt="Menu" />
      </button>
      <button className={styles.navButton}>
        <img src="/profile-icon.svg" alt="Profile" />
      </button>
    </nav>
  );
};

export default Navigation; 