import styles from "./bottomLinks.module.css";
import { useCartStore } from "@/store/cartStore";

interface BottomLink {
  icon: string;
  name: string;
  href: string;
}

const BottomLinks: React.FC = () => {
  const { cartItems } = useCartStore();
  const bottomLinks: BottomLink[] = [
    { icon: "🛒", name: `CART (${cartItems.length})`, href: "/cart" },
    { icon: "⭐", name: "FAVOURITE", href: "#" },
    { icon: "🔍", name: "SEARCH", href: "#" },
  ];
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
};

export default BottomLinks;
