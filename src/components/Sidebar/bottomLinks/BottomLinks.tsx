import { Link } from "react-router-dom";
import { useFavoriteStore } from "@/stores/favoriteStore";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart, Heart, Search } from "lucide-react";
import styles from "./bottomLinks.module.css";

const BottomLinks: React.FC = () => {
  const { totalQuantity } = useCartStore();
  const totalFavQuantity = useFavoriteStore((state) => state.totalFavQuantity);

  const bottomLinks = [
    {
      icon: <ShoppingCart size={18} />,
      name: `Cart`,
      count: totalQuantity,
      href: "/cart",
    },
    {
      icon: <Heart size={18} />,
      name: `Wishlist`,
      count: totalFavQuantity,
      href: "/wishlist",
    },
    {
      icon: <Search size={18} />,
      name: "Search",
      href: "/search",
    },
  ];

  return (
    <div className={styles.bottomLinks}>
      <ul className={styles.bottomLinksList}>
        {bottomLinks.map((link) => (
          <li key={link.name} className={styles.bottomLinksItem}>
            <Link to={link.href} className={styles.bottomLinksLink}>
              <span className={styles.bottomLinksIcon}>{link.icon}</span>
              <span className={styles.bottomLinksText}>{link.name}</span>
              {link.count !== undefined && (
                <span className={styles.bottomLinksCount}>{link.count}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomLinks;
