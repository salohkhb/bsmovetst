import styles from "../index.module.css";
import VehicleRentPresentationAccordion from "./VehicleRentPresentationAccordion";
import messages from "../messages";

const VehicleRentPresentationFAQ = () => (
  <main className={styles.vehicle_rent_faq__main}>
    <h2>{messages.faq.title}</h2>
    <section className={styles.vehicle_rent_faq__accordion_wrapper}>
      <VehicleRentPresentationAccordion
        summary={messages.faq.firstSection.title}
        content={messages.faq.firstSection.content}
      />
      <VehicleRentPresentationAccordion
        summary={messages.faq.secondSection.title}
        content={messages.faq.secondSection.content}
      />
      <VehicleRentPresentationAccordion
        summary={messages.faq.thirdSection.title}
        content={messages.faq.thirdSection.content}
      />
      <VehicleRentPresentationAccordion
        summary={messages.faq.fourthSection.title}
        content={messages.faq.fourthSection.content}
      />
    </section>
  </main>
);

export default VehicleRentPresentationFAQ;
