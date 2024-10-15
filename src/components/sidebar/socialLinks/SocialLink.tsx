import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { IconType } from "react-icons";
import styles from "./socialLinks.module.css";

interface SocialLink {
  name: string;
  href: string;
  icon: IconType;
}

const socialLinks: SocialLink[] = [
  { name: "Facebook", href: "#", icon: FaInstagram },
  { name: "Instagram", href: "#", icon: FaFacebookF },
  { name: "Twitter", href: "#", icon: FaTwitter },
];

export default function SocialLink() {
  return (
    <div className={styles.socialLinkContainer}>
      <ul className={styles.socialLinks}>
        {socialLinks.map((social) => (
          <li key={social.name} className={styles.socialItem}>
            <Link to={social.href} className={styles.socialLink}>
              {React.createElement(social.icon, { size: 20 })}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
