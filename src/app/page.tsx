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
          {activeSection === "tournaments" && (
            <div className={styles.tournamentGrid}>
              <div className={styles.tournamentCard}>
                <img 
                  src="/trophy.jpeg" 
                  alt="Clausura 2025"
                  className={styles.tournamentImage}
                />
                <div className={styles.tournamentTitle}>Clausura 2025</div>
              </div>
              <div className={styles.tournamentCard}>
                <img 
                  src="/trophy.jpeg" 
                  alt="Familia Mtz 2025 CL"
                  className={styles.tournamentImage}
                />
                <div className={styles.tournamentTitle}>Familia Mtz 2025 CL</div>
              </div>
              <div className={styles.tournamentCard}>
                <img 
                  src="/trophy.jpeg" 
                  alt="Familia Mtz Apertura 2024"
                  className={styles.tournamentImage}
                />
                <div className={styles.tournamentTitle}>Familia Mtz Apertura 2024</div>
              </div>
              <div className={styles.tournamentCard}>
                <img 
                  src="/trophy.jpeg" 
                  alt="Familia Mtz Clausura 2024"
                  className={styles.tournamentImage}
                />
                <div className={styles.tournamentTitle}>Familia Mtz Clausura 2024</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
};

export default Home;
