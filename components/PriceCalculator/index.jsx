import { useEstimate } from "../../hooks/estimate";
import Fade from "@mui/material/Fade";

import styles from "./index.module.css";
import { CURRENCY } from "../../helpers/constants";

const PriceCalculator = () => {
  const { estimate = {}, priceCalculator: { km, totalPrice = 0 } = {} } =
    useEstimate();

  return (
    <Fade in={estimate?.inventory?.volume?.volume && km} timeout={500}>
      <section className={styles.price_calculator__container}>
        <div className={styles.price_calculator__header}>
          <div className={styles.price_calculator__distance}>
            <span>
              {estimate?.details?.departureInformations?.address?.city || "--"}
            </span>
            <span>{"<>"}</span>
            <span>
              {estimate?.details?.arrivalInformations?.address?.city || "--"}
            </span>
          </div>
          <hr className={styles.price_calculator__separator} />
        </div>
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
