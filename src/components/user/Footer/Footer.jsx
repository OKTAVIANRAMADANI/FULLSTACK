import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.logo}>LIFT</div>
        </div>

        <div className={styles.column}>
          <h4>Learn More</h4>
          <ul>
            <li><a href="#">About Lift</a></li>
            <li><a href="#">Press Releases</a></li>
            <li><a href="#">Environment</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Tickets & Booking</h4>
          <ul>
            <li><a href="#">Lift Tickets</a></li>
            <li><a href="#">Season Passes</a></li>
            <li><a href="#">Vacation Packages</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Contact Us</h4>
          <ul>
            <li>Hotel Reservation: <a href="tel:1234567890">123-456-7890</a></li>
            <li>Ticket Office: <a href="tel:1234567890">123-456-7890</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Social</h4>
          <div className={styles.socialIcons}>
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-youtube"></i></a>
            <a href="#"><i className="fa fa-wordpress"></i></a>
          </div>
        </div>
      </div>
      <div className={styles.copy}>
        © 2019 Lift Media | All Rights Reserved
      </div>
    </footer>
  );
}
