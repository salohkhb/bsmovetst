import { useEstimate } from "../../hooks/estimate";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";

import styles from "./index.module.css";
import { CURRENCY } from "../../helpers/constants";

function mapPriceCalculatorValues(priceCalculator) {
  return [
    {label: 'Km et volume', value: priceCalculator.priceWithKmAndVolume},
    {label: 'Avec ascenseur et monte meubles', value: priceCalculator.priceWithElevator},
    {label: 'Avec portage', value: priceCalculator.priceWithPortage},
  ]
}

const PriceCalculator = () => {
  const { priceCalculator } = useEstimate();

  const values = mapPriceCalculatorValues(priceCalculator)
  return (
    <Fade in={priceCalculator.totalPrice !== 0} timeout={1000}>
      <section className={styles.price_calculator__container}>
        <div className={styles.price_calculator__content}>
          <article className={styles.price_calculator__main}>
            <div>
              <h3 className={styles.price_calculator__header}>
                Calculateur de prix (estimation)
              </h3>
              <Divider />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1em', paddingTop: '1em' }}>
                { values.map((item) => (
                        <div key={item.label} style={{ display: "flex", gap: '1em', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontWeight: 'bold' }}>{item.label}: </span>
                          <span>{parseInt(item.value)}{CURRENCY.EUR}</span>
                        </div>
                    )
                )}
              </div>
            </div>
          </article>
          <article>
            <Divider />
            <p className={styles.price_calculator__footer}>
              <span style={{ fontWeight: 'bold' }}>Prix total estimé : </span>
              <span>
                {priceCalculator.totalPrice}
                {CURRENCY.EUR}
              </span>
            </p>
          </article>
        </div>
      </section>
    </Fade>
  );
};

export default PriceCalculator;
