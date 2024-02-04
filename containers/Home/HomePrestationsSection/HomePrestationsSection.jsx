import Routes from "../../../helpers/routes";
import styles from "../index.module.css";
import messages from "../messages";
import PrestationCategoryPreview from "../PrestationCategoryPreview/PrestationCategoryPreview";

const categories = [
  {
    href: Routes.ESTIMATE_DETAILS_PAGE,
    title: messages.prestationsSection.categories.moving,
    src: "/images/prestation_1.png",
  },
  {
    href: Routes.VEHICLE_RENT_PAGE,
    title: messages.prestationsSection.categories.vehicleRent,
    src: "/images/prestation_2.png",
  },
  {
    href: Routes.FURNITURES_BUY_PAGE,
    title: messages.prestationsSection.categories.furnituresBuy,
    src: "/images/prestation_3.png",
  },
];

const HomePrestationsSection = () => (
  <section className={styles.prestations_section}>
    <div className={styles.section_title}>
      {messages.prestationsSection.title}
    </div>
    <section className={styles.prestation_section_subtitle_container}>
      <div className={styles.section_subtitle}>
        {messages.prestationsSection.subtitles.leftPart}
      </div>
      <div className={styles.bsmove_title}>
        {messages.prestationsSection.subtitles.title}
      </div>
    </section>
    <section className={styles.prestation_section_content}>
      <div className={styles.section_content}>
        {messages.prestationsSection.content}
      </div>
    </section>
    <section className={styles.prestation_section_categories_container}>
      {categories.map((category) => (
        <PrestationCategoryPreview key={category.title} category={category} />
      ))}
    </section>
  </section>
);

export default HomePrestationsSection;
