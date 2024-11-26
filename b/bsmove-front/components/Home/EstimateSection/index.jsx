import Button from '../../Button/index'
import Image from "next/legacy/image";
import styles from '../index.module.css'
import { useGlobal } from "../../../hooks/global";
import { useRouter } from "next/router";
import Routes from '../../../helpers/routes'

const EstimateSection = ({ messages }) => {
  const {
    global: { screenWidth },
  } = useGlobal();
  let router = useRouter();
  return (
    <div className={styles.estimate_section}>
      <div className={styles.home_estimate_section_left}>
        <h1 className={styles.section_title}>
          {messages.estimateSection.title}
        </h1>
        <h2 className={styles.estimate_section_main_content}>
          {messages.estimateSection.content.main}
        </h2>
        <div className={styles.estimate_section_secondary_content}>
          {messages.estimateSection.content.secondary}
        </div>
        <div className={styles.estimate_section_actions_container}>
          <Button
            onClick={() => router.push(Routes.ESTIMATE_DETAILS_PAGE)}
            margin="0 4px 0 0"
          >
            {messages.estimateSection.actions.leftButton}
          </Button>
        </div>
      </div>
      <div className={styles.home_estimate_section_right}>
        <div className={styles.home_estimate_section_right_img_container}>
          <Image
            className={styles.home_estimage_section_right_img_illustration}
            layout="fill"
            src="/images/meaux.jpg"
            alt="homepage_section_estimate"
          />
        </div>
      </div>
    </div>
  );
};

export default EstimateSection