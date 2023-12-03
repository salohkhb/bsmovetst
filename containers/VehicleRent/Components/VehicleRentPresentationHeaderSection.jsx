import styles from '../index.module.css';
import Image from 'next/legacy/image';
import {Subtitle} from '../../../components/Texts';
import {S} from '../index';

const VehicleRentPresentationHeaderSection = () => (
  <div>
    <header className={styles.vehicle_rent_presentation__header}>
      <section className={styles.vehicle_rent_presentation__left_section}>
        <article
          className={styles.vehicle_rent_presentation__left_section_article}
        >
          <Subtitle>{"Location d'un véhicule avec déménageur"}</Subtitle>
          <S.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            viverra posuere vehicula. Nulla erat tortor, lobortis sed commodo
            et, commodo vel urna. usce ultricies nibh tortor, in pellentesque
            est ultrices eget
          </S.Content>
        </article>
      </section>
      <section className={styles.vehicle_rent_presentation__right_section}>
        <Image
          layout={"fill"}
          className={styles.vehicle_rent_presentation__right_section_img}
          src={"/images/prestation_3.png"}
          alt={"vehicle_rent_illustration"}
        />
      </section>
    </header>
  </div>
);

export default VehicleRentPresentationHeaderSection;