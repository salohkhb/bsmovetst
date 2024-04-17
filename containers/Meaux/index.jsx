import HomePrestationsSection from "../Home/HomePrestationsSection/HomePrestationsSection";
import styles from "./index.module.css"
import Image from "next/legacy/image";
import Button from "../../components/Button";
import { useGlobal } from "../../hooks/global";
import { useRouter } from "next/router";
import messages from "./messages";
import Routes from "../../helpers/routes";

  
const MeauxEstimateSection = () => {
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

const MeauxCompetencesSection = () => {
  const router = useRouter();
  return (
  <div className={styles.competences_section}>
    <div className={styles.competences_section_illustration_container}>
      <div className={styles.competences_section_illustration}>
        <Image
          className={styles.prestation_section_category_thumbnail}
          layout="fill"
          src="/images/moving_together_illu.png"
          alt="competences"
        />
      </div>
    </div>
    <div className={styles.competences_section_infos}>
      <div className={styles.section_title}>
        {messages.competencesSection.title}
      </div>
      <div className={styles.section_subtitle}>
        {messages.competencesSection.subtitle}
      </div>
      <div className={styles.competences_section_infos_content}>
        <div>{messages.competencesSection.contents.firstPart}</div>
        <div>{messages.competencesSection.contents.secondPart}</div>
      </div>
      <div className={styles.estimate_section_actions_container}>
          <Button
            onClick={() => router.push(Routes.VEHICLE_RENT_PAGE)}
            margin="0 0 0 4px"
          >
            {messages.competencesSection.action}
          </Button>
        </div>
    </div>
  </div>
  );
};

const MeauxMeubleSection = () => {
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

const Meaux = () => {
  return (
    <div className={styles.container}>
      <MeauxEstimateSection />
      <HomePrestationsSection />
      <MeauxCompetencesSection />
      <MeauxMeubleSection />
    </div>
  )
}

export default Meaux