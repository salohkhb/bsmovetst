import Button from '../../Button/index'
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import Routes from '../../../helpers/routes'
import styles from '../index.module.css'

const CompetencesSection = ({ messages }) => {
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

export default CompetencesSection