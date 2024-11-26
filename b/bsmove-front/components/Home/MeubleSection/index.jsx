import Button from '../../Button/index'
import Image from "next/legacy/image";
import styles from '../index.module.css'
import { useGlobal } from "../../../hooks/global";
import { useRouter } from "next/router";
import Routes from '../../../helpers/routes'



const MeubleSection = ({ messages }) => {
  const {
    global: { screenWidth },
  } = useGlobal();
  let router = useRouter();
  return (
    <div className={styles.estimate_section}>
      <div className={styles.home_estimate_section_left}>
        <h2 className={styles.section_title}>
          {messages.meubleSection.title}
        </h2>
        <h3 className={styles.estimate_section_main_content}>
          {messages.meubleSection.content.main}
        </h3>
        <div className={styles.estimate_section_secondary_content}>
          {messages.meubleSection.content.secondary}
        </div>
        <div className={styles.estimate_section_actions_container}>
          <Button
            onClick={() => router.push(Routes.FURNITURES_BUY_PAGE)}
            margin="0 4px 0 0"
          >
            {messages.meubleSection.actions.leftButton}
          </Button>
        </div>
      </div>
      <div className={styles.home_estimate_section_right}>
        <div className={styles.home_estimate_section_right_img_container}>
          <Image
            className={styles.home_estimage_section_right_img_illustration}
            layout="fill"
            src="/images/prestation_3.png"
            alt="homepage_section_estimate"
          />
        </div>
      </div>
    </div>
  );
};

export default MeubleSection