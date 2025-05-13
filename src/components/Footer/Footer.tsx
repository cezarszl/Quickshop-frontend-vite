import styles from "./footer.module.css";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Cezary Szal</h3>
          <p className={styles.footerText}>Web Developer & Software Engineer</p>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Connect</h3>
          <ul className={styles.socialLinks}>
            <li>
              <Link
                to="https://github.com/cezarszl"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </li>
            <li>
              <Link
                to="https://linkedin.com/in/cezary-szal"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                to="https://x.com/cezarszl"
                target="_blank"
                rel="noopener noreferrer"
              >
                X (Twitter)
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Contact</h3>
          <p className={styles.footerText}>
            <a href="mailto:cezarszl@gmail.com" className={styles.emailLink}>
              cezarszl@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Cezary Szal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
