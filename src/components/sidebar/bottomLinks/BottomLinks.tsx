import styles from "./bottomLinks.module.css";

interface BottomLink {
  icon: string;
  name: string;
  href: string;
}

const bottomLinks: BottomLink[] = [
  { icon: "🛒", name: "CART (0)", href: "#" },
  { icon: "⭐", name: "FAVOURITE", href: "#" },
  { icon: "🔍", name: "SEARCH", href: "#" },
];

export default function BottomLinks() {
  return (
    <div className={styles.bottomLinks}>
      <ul className={styles.bottomLinksList}>
        {bottomLinks.map((link) => (
          <li key={link.name} className={styles.bottomLinksItem}>
            <span className={styles.bottomLinksIcon}>{link.icon}</span>
            <a href={link.href} className={styles.bottomLinksLink}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
