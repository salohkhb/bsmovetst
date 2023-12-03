import Image from "next/legacy/image";
import Button from '../../../components/Button';
import {useGlobal} from "../../../hooks/global";
import {useRouter} from "next/router";
import styles from '../index.module.css';
import messages from '../messages';
import Routes from "../../../helpers/routes";
import {any} from 'prop-types';


const HomeEstimateSection = ({ technicalIssueAlert }) => {
  const { global: { screenWidth }} = useGlobal();
  const router = useRouter()
  return (
      <div className={styles.estimate_section}>
          <div className={styles.home_estimate_section_left}>
              <div className={styles.section_title}>{messages.estimateSection.title}</div>
              <h1 className={styles.estimate_section_main_content}>{messages.estimateSection.content.main}</h1>
              <div className={styles.estimate_section_secondary_content}>
                  {messages.estimateSection.content.secondary}
              </div>
              <div className={styles.estimate_section_actions_container}>
                  <Button
                      onClick={() => router.push(Routes.ESTIMATE_DETAILS_PAGE)}
                      margin='0 4px 0 0'>{messages.estimateSection.actions.leftButton}
                  </Button>
              </div>
          </div>
          <div className={styles.home_estimate_section_right}>
              <div className={styles.home_estimate_section_right_img_container}>
                  {screenWidth > 900 ? (
                      <Image
                          className={styles.home_estimage_section_right_img_illustration}
                          layout="fill"
                          src='/images/homescreen_1.png'
                          alt='homepage_section_estimate'
                      />
                  ) : (
                      <Image
                          className={styles.home_estimage_section_right_img_illustration}
                          layout="fill"
                          src='/images/home_estimate_illustration_mobile.png'
                          alt='homepage_section_estimate'
                      />
                  )}
              </div>
          </div>
      </div>
  )
}

HomeEstimateSection.propTypes = {
  technicalIssueAlert: any
};

export default HomeEstimateSection;
