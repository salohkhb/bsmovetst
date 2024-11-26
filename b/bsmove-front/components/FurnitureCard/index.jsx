import { useEffect, useState } from "react";
import Image from "next/legacy/image";

import { useBasket } from "../../hooks/basket";
import Counter from "../Counter";

const FurnitureCard = ({ item }) => {
  const { addToBasket, removeFromBasket, basket } = useBasket();
  const [count, setCount] = useState(0);
  const { id, name, description, price, base64, stock } = item;

  useEffect(() => {
    if (basket.items?.length > 0) {
      const basketItem = basket.items.find(
        (basketItem) => basketItem.id === item.id
      );
      if (basketItem) {
        setCount(basketItem.quantity);
      }
    }
  }, [item, basket]);

  async function handleCountInc() {
    setCount((prevCount) => prevCount + 1);
    addToBasket(item);
  }

  async function handleCountDec() {
    setCount((prevCount) => {
      if (prevCount <= 0) return 0;
      return prevCount - 1;
    });
    removeFromBasket(item);
  }

  return (
    <div className="furniture-card-component__furnitures_card_component">
      <div className="furniture-card-component__furniture_card_img_container">
        <div className="furniture-card-component__furniture_card_img_illustration_container">
          <Image
            className="furniture-card-component__furniture_card_img_illustration"
            layout="fill"
            src={base64 || "/images/logo.png"}
            alt={`${name}-${id}`}
          />
        </div>
      </div>
      <div className="furniture-card-component__furniture_card_description">
        <section>
          <div className="furniture-card-component__furniture_card_title">
            {name}
          </div>
          <div>{`${price}€`}</div>
        </section>
        <Counter
          minValue={0}
          maxValue={stock || 20}
          value={count}
          handleInc={handleCountInc}
          handleDec={handleCountDec}
          margin="50% 0 0 0"
        />
      </div>
    </div>
  );
};

export default FurnitureCard;
