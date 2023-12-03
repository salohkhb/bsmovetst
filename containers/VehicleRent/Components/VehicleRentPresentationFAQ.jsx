import styles from '../index.module.css';
import VehicleRentPresentationAccordion from './VehicleRentPresentationAccordion';

const VehicleRentPresentationFAQ = () => (
  <main className={styles.vehicle_rent_faq__main}>
    <h2>Questions posées fréquemment</h2>
    <section className={styles.vehicle_rent_faq__accordion_wrapper}>
      <VehicleRentPresentationAccordion summary="Titre 1" content="content 1" />
      <VehicleRentPresentationAccordion summary="Titre 2" content="content 2" />
      <VehicleRentPresentationAccordion summary="Titre 3" content="content 3" />
      <VehicleRentPresentationAccordion summary="Titre 4" content="content 4" />
    </section>
  </main>
)

export default VehicleRentPresentationFAQ