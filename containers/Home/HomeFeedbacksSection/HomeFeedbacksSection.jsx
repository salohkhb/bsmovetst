import { any } from 'prop-types';
import Button from '../../../components/Button';
import FeedbackCard from '../../../components/FeedbackCard';
import styles from '../index.module.css';
import messages from '../messages';

const feedbacks = [
  'Très efficace, service impeccable. J\'ai même déménagé un piano et ils en pris grand soin! Je recommande chaudement.',
  'Très bon service et excellent relationnel. Le tarif est très compétitif et la qualité du service est au rendez-vous.',
  'Super ! Parfait !  Il est tombé en panne et a loué une camionnette pour honorer quand même notre rendez vous.'
]

const HomeFeedbacksSection = ({ technicalIssueAlert }) => (
  <div className={styles.feedbacks_section}>
    <div className={styles.section_title}>{messages.feedbackSection.title}</div>
    <div className={styles.section_subtitle}>{messages.feedbackSection.subtitle}</div>
    <div className={styles.feedback_section_carousel_container}>
      <div className={styles.feedback_section_carousel}>
        <FeedbackCard
          feedback={feedbacks[0]}
          user={{ name: 'Leslie Alexander' }}
          imgSrc='/images/BGLeslie_alexander_avatar.png'
        />
        <FeedbackCard
            feedback={feedbacks[1]} user={{ name: 'Cameron Williamson' }} imgSrc='/images/BGCameron_williamson.png'
        />
        <FeedbackCard
            feedback={feedbacks[2]} user={{ name: 'Esther Howard' }} imgSrc='/images/BGEsther_howard.png'
        />
      </div>
    </div>
  </div>
)

HomeFeedbacksSection.propTypes = {
  technicalIssueAlert: any
}

export default HomeFeedbacksSection