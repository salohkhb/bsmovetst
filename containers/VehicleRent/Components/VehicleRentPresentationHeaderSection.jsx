import styles from "../index.module.css";
import Image from "next/legacy/image";
import { Subtitle } from "../../../components/Texts";
import { S } from "../index";
import { useGlobal } from "../../../hooks/global";

const VehicleRentPresentationHeaderSection = () => {
  const { screenWidth } = useGlobal();
  return (
    <div>
      <header className={styles.vehicle_rent_presentation__header}>
        <section className={styles.vehicle_rent_presentation__left_section}>
          <article
            className={styles.vehicle_rent_presentation__left_section_article}
          >
            <Subtitle>{"Location d'un véhicule avec déménageur"}</Subtitle>
            <S.Content>
              Découvrez notre gamme de services de location, offrant une
              flexibilité totale. Louez un monte-meuble avec opérateur, un
              camion avec chauffeur ou des déménageurs qualifiés selon vos
              besoins. Chez Bsmove, nous vous garantissons une expérience de
              déménagement personnalisée, avec des solutions de qualité pour
              chaque étape de votre transition.
            </S.Content>
          </article>
        </section>
        <section className={styles.vehicle_rent_presentation__right_section}>
          <Image
            layout={"fill"}
            className={styles.vehicle_rent_presentation__right_section_img}
            src={
              screenWidth > 1100
                ? "/images/prestation_2.png"
                : "/images/bsmove-mobile-rent.jpg"
            }
            alt={"vehicle_rent_illustration"}
          />
        </section>
      </header>
    </div>
  );
};

export default VehicleRentPresentationHeaderSection;
