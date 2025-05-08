import { useFavoriteStore } from "@/stores/favoriteStore";
import styles from "./bottomLinks.module.css";
import { useCartStore } from "@/stores/cartStore";

interface BottomLink {
  icon: string;
  name: string;
  href: string;
}

const BottomLinks: React.FC = () => {
  const { totalQuantity } = useCartStore();
  const totalFavQuantity = useFavoriteStore((state) => state.totalFavQuantity);

  const bottomLinks: BottomLink[] = [
    {
      icon: "🛒",
      name: `CART (${totalQuantity})`,
      href: "/cart",
    },
    {
      icon: "⭐",
      name: `FAVORITES (${totalFavQuantity})`,
      href: "/favorites",
    },

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
