import styles from '../styles/Navigation.module.css';
import { useEffect } from 'react';

const Navigation = () => {
  useEffect(() => {
    // Load the animated icons script
    const script = document.createElement('script');
    script.src = 'https://animatedicons.co/scripts/embed-animated-icons.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <nav className={styles.navigation}>
      <button className={`${styles.navButton} ${styles.active}`}>
        <animated-icons
          src="https://animatedicons.co/get-icon?name=home&style=minimalistic&token=1de785be-f87f-4fdd-9cda-efb65431763b"
          trigger="click"
          attributes='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#536DFE","background":"#FFFFFF"}}'
          height="24"
          width="24"
        />
        <span>Home</span>
      </button>
      <button className={styles.navButton}>
        <animated-icons
          src="https://animatedicons.co/get-icon?name=Submitted&style=minimalistic&token=6d7e5987-c952-49a3-89a8-a213c4d8aa90"
          trigger="click"
          attributes='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#536DFE","background":"#FFFFFF"}}'
          height="32"
          width="32"
        />
        <span>Quinielas</span>
      </button>
      <button className={styles.navButton}>
        <animated-icons
          src="https://animatedicons.co/get-icon?name=calendar&style=minimalistic&token=1de785be-f87f-4fdd-9cda-efb65431763b"
          trigger="click"
          attributes='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#536DFE","background":"#FFFFFF"}}'
          height="32"
          width="32"
        />
        <span>Calendario</span>
      </button>
      <button className={styles.navButton}>
        <animated-icons
          src="https://animatedicons.co/get-icon?name=Edit%20V2&style=minimalistic&token=103ba7b6-a0d9-4d83-87ae-7aceb8cc75aa"
          trigger="click"
          attributes='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#536DFE","background":"#FFFFFF"}}'
          height="32"
          width="32"
        />
        <span>Menu</span>
      </button>
      <button className={styles.navButton}>
        <animated-icons
          src="https://animatedicons.co/get-icon?name=user%20profile&style=minimalistic&token=103ba7b6-a0d9-4d83-87ae-7aceb8cc75aa"
          trigger="click"
          attributes='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#536DFE","background":"#FFFFFF"}}'
          height="32"
          width="32"
        />
        <span>Perfil</span>
      </button>
    </nav>
  );
};

export default Navigation; 