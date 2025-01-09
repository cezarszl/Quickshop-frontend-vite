import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import styles from "./quantityControl.module.css";
import { useCartStore } from "@/store/cartStore";

interface QuantityControlProps {
  productId: number;
  currentQuantity: number;
}
const QuantityControl: React.FC<QuantityControlProps> = ({
  productId,
  currentQuantity,
}) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleDecreaseQuantity = async () => {
    if (currentQuantity > 1) {
      try {
        await updateQuantity(productId, currentQuantity - 1);
      } catch (error) {
        console.error("Failed to decrease quantity:", error);
      }
    }
  };

  const handleIncreaseQuantity = async () => {
    if (currentQuantity < 300) {
      try {
        await updateQuantity(productId, currentQuantity + 1);
      } catch (error) {
        console.error("Failed to increase quantity:", error);
      }
    }
  };

  const handleRemoveItem = async () => {
    try {
      await removeItem(productId);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if ((!isNaN(newQuantity) && newQuantity >= 1) || newQuantity < 300) {
      try {
        await updateQuantity(productId, newQuantity);
      } catch (error) {
        console.error("Failed to update quantity", error);
      }
    }
  };

  return (
    <div className={styles.quantityControl}>
      <p>Qty</p>
      <button onClick={handleDecreaseQuantity} className={styles.qtyBtn}>
        <FaMinus className={styles.qtyIcon} />
      </button>
      <input
        type="number"
        readOnly
        onChange={handleInputChange}
        className={styles.qtyInput}
        id="qty"
        min={1}
        max={300}
        name="quantity"
        value={currentQuantity}
      ></input>
      <button onClick={handleIncreaseQuantity} className={styles.qtyBtn}>
        <FaPlus className={styles.qtyIcon} />
      </button>
      <button onClick={handleRemoveItem} className={styles.removeBtn}>
        <FaTrash />
      </button>
    </div>
  );
};

export default QuantityControl;
