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
    <Fade in={estimate?.inventory?.volume?.volume} timeout={500}>
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
                  {priceCalculator.priceHeavyObjects.toFixed(2)}
                  {CURRENCY.EUR}
                </span>
              </div>
            ) : null}
            {priceCalculator.priceMounting ? (
              <div className={styles.price_calculator__price_detail}>
                <span>Démontages/Remontages:</span>
                <span>
                  {priceCalculator.priceMounting.toFixed(2)}
                  {CURRENCY.EUR}
                </span>
              </div>
            ) : null}
            {priceCalculator.priceForStandardFurnitures ? (
              <div className={styles.price_calculator__price_detail}>
                <span>Cartons non-fragiles:</span>
                <span>
                  {priceCalculator.priceForStandardFurnitures.toFixed(2)}
                  {CURRENCY.EUR}
                </span>
              </div>
            ) : null}
            {priceCalculator.priceForStandardWrapping ? (
              <div className={styles.price_calculator__price_detail}>
                <span>
                  {"Prix de l'aide à l'emballage des cartons non-fragiles:"}
                </span>
                <span>
                  {priceCalculator.priceForStandardWrapping.toFixed(2)}
                  {CURRENCY.EUR}
                </span>
              </div>
            ) : null}
            {priceCalculator.priceForFragileFurnitures ? (
              <div className={styles.price_calculator__price_detail}>
                <span>Fournitures fragiles:</span>
                <span>
                  {priceCalculator.priceForFragileFurnitures.toFixed(2)}
                  {CURRENCY.EUR}
                </span>
              </div>
            ) : null}
            {priceCalculator.priceForFragileWrapping ? (
              <div className={styles.price_calculator__price_detail}>
                <span>
                  {"Prix de l'aide à l'emballage des fournitures fragiles:"}
                </span>
                <span>
                  {priceCalculator.priceForFragileWrapping.toFixed(2)}
                  {CURRENCY.EUR}
                </span>
              </div>
            ) : null}
          </div>
        </section>
        <div className={styles.price_calculator__price}>
          <span>Total:</span>
          <span>
            {totalPrice.toFixed(2)}
            {CURRENCY.EUR}
          </span>
        </div>
      </section>
    </Fade>
  );
};

export default PriceCalculator;
