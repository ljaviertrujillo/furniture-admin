import { VscHeart } from "react-icons/vsc";
import { Product } from "../../../../models";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState<number>(0);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity < 1) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product">
      <img
        src={product.images[0]}
        alt={product.title}
        className="product-image"
      />
      <div className="product-detail">
        <button type="button" className="favorite-btn">
          <VscHeart />
        </button>
        <div className="quantity-container">
          <button type="button" onClick={handleDecreaseQuantity}>
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button type="button" onClick={handleIncreaseQuantity}>
            +
          </button>
        </div>
      </div>
      <div className="product-detail-info"></div>
      <div className="product-material"></div>
    </div>
  );
}
