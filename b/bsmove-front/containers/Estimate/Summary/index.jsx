import Fade from "@mui/material/Fade";
import styles from "./index.module.css";

import SummaryInventorySection from "./components/SummaryInventorySection";
import SummaryAddressSection from "./components/SummaryAddressSection";

export const EstimateSummaryInformationBlock = ({
  label = "",
  content = "",
}) => {
  return (
    <div className={styles.estimate_informations_block_container}>
      <div className={styles.estimate_informations_block_label}>{label}</div>
      <div className={styles.estimate_informations_block_content}>
        {content}
      </div>
    </div>
  );
};

export const UNKNOW = "Non communiqué";

const EstimateSummaryComponent = () => (
  <Fade in={true} timeout={500}>
    <div className={styles.sectionsContainer}>
      <SummaryAddressSection />
      <SummaryInventorySection />
    </div>
  </Fade>
);

export default EstimateSummaryComponent;
