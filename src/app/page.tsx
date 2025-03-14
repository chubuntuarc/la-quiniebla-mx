'use client';

import { useSession } from "next-auth/react";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Navigation from "../../src/components/Navigation";

const Home = () => {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState("pools");

  return (
    <div className={styles.container}>
      {/* Header with Create and Play buttons */}
      <div className={`${styles.header} ${styles.blurredHeader}`}>
        <img 
          src="/quiniebla.webp" 
          alt="Quiniebla Logo" 
          className={styles.logo}
        />
      </div>

      {/* Main content sections */}
      <div className={styles.content}>
        <div className={styles.section}>
          <button
            className={styles.sectionHeader}
            onClick={() =>
              setActiveSection(
                activeSection === "tournaments" ? "" : "tournaments"
              )
            }
          >
            <span>Mis Quinielas ({4})</span>
            <span className={styles.arrow}>▼</span>
          </button>
          {/* Add expandable content here */}
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Home;
