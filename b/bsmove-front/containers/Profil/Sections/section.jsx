import Fade from "@mui/material/Fade";

import styles from "./index.module.css";
import { any, node, string } from "prop-types";

const SectionContainer = ({
  sectionTitle = "",
  component: Component,
  ...rest
}) => {
  return (
    <Fade in={true} timeout={500}>
      <div className={styles.profil_section_container}>
        <div className={styles.profil_section_title}>{sectionTitle}</div>
        <Component {...rest} />
      </div>
    </Fade>
  );
};

SectionContainer.propTypes = {
  sectionTitle: string,
  component: node,
  rest: any,
};

export default SectionContainer;
