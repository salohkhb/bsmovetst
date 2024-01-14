import { useEstimate } from "../../hooks/estimate";
import Fade from "@mui/material/Fade";

import styles from "./index.module.css";
import { CURRENCY } from "../../helpers/constants";

const PriceCalculator = () => {
  const {
    estimate = {},
    priceCalculator: { km, totalPrice = 0 } = {},
    priceCalculator = {},
  } = useEstimate();

  return (
    <Fade in={estimate?.inventory?.volume?.volume && km} timeout={500}>
      <section className={styles.price_calculator__container}>
        <section>
          <div className={styles.price_calculator__header}>
            <div className={styles.price_calculator__distance}>
              <span>
                {estimate?.details?.departureInformations?.address?.city ||
                  "--"}
              </span>
              <span>{"<>"}</span>
              <span>
                {estimate?.details?.arrivalInformations?.address?.city || "--"}
              </span>
            </div>
            <hr className={styles.price_calculator__separator} />
          </div>
          <div className={styles.price_calculator__price_details_list}>
            {/* objets lourd, démontage/remontage, fournitures et emballage */}
            {priceCalculator.priceHeavyObjects ? (
              <div className={styles.price_calculator__price_detail}>
                <span>Objets lourds:</span>
                <span>
                  {priceCalculator.priceHeavyObjects}
                  {CURRENCY.EUR}
                </span>
              </div>
            ) : null}
            {priceCalculator.priceMounting ? (
              <div className={styles.price_calculator__price_detail}>
                <span>Démontages/Remontages:</span>
                <span>
                  {priceCalculator.priceMounting}
                  {CURRENCY.EUR}
                </span>
              </div>
            ) : null}
            {priceCalculator.priceExtraFurnitures ? (
              <div className={styles.price_calculator__price_detail}>
                <span>Fournitures et emballage:</span>
                <span>
                  {priceCalculator.priceExtraFurnitures}
                  {CURRENCY.EUR}
                </span>
              </div>
            ) : null}
          </div>
        </section>
        <div className={styles.price_calculator__price}>
          <span>Total:</span>
          <span>
            {totalPrice}
            {CURRENCY.EUR}
          </span>
        </div>
      </section>
    </Fade>
  );
};

export default PriceCalculator;
