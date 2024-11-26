import styles from '../index.module.css';
import VehicleRentPresentationSteps from './VehicleRentPresentationSteps';

const VehicleRentPresentationContentSection = () => {
  return (
    <main className={styles.vehicle_rent_presentation__main}>
      <section>
        <article className={styles.vehicle_rent_presentation__article}>
          <h2 className={styles.vehicle_rent_presentation__main_heading}>
            Réservez votre véhicule en 3 étapes
          </h2>
          <VehicleRentPresentationSteps />
        </article>
      </section>
    </main>
  );
};

export default VehicleRentPresentationContentSection;
