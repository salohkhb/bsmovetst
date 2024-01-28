import { any } from "prop-types";
import Button from "../../../components/Button";
import FeedbackCard from "../../../components/FeedbackCard";
import styles from "../index.module.css";
import messages from "../messages";

const feedbacks = [
  "Très bon professionnel. Nous sommes déjà passé trois fois par lui et toujours avec satisfaction. Très réactif et toujours à l'écoute pour gérer le déménagement.",
  "J’ai récemment choisi Bsmove déménagement pour mon déménagement local, et je ne pourrais être plus satisfaite. L’équipe a été incroyablement professionnelle, assurant un emballage sécurisé et un transport efficace de mes biens. Le service client était exceptionnel, répondant à toutes mes questions et préoccupations. Bsmove a rendu ce processus souvent stressant extrêmement fluide. Je les recommande vivement pour leurs services de déménagement de haute qualité.",
  "Mon expérience avec Bsmove déménagement a été exceptionnelle du début à la fin. L’équipe a dépassé toutes mes attentes en assurant un démontage rapide et un emballage sécurisé de mes meubles fragiles. Le jour du déménagement, tout s’est déroulé de manière très organisée et efficace. Le professionnalisme de Bsmove a vraiment fait la différence. Si vous cherchez une équipe de déménagement fiable et compétente, Bsmove est le choix parfait.",
];

const HomeFeedbacksSection = ({ technicalIssueAlert }) => (
  <div className={styles.feedbacks_section}>
    <div className={styles.section_title}>{messages.feedbackSection.title}</div>
    <div className={styles.section_subtitle}>
      {messages.feedbackSection.subtitle}
    </div>
    <div className={styles.feedback_section_carousel_container}>
      <div className={styles.feedback_section_carousel}>
        <FeedbackCard
          feedback={feedbacks[0]}
          user={{ name: "Leslie Alexander" }}
          imgSrc="/images/feedback-1.png"
        />
        <FeedbackCard
          feedback={feedbacks[1]}
          user={{ name: "Cameron Williamson" }}
          imgSrc="/images/feedback-2.jpeg"
        />
        <FeedbackCard
          feedback={feedbacks[2]}
          user={{ name: "Esther Howard" }}
          imgSrc="/images/feedback-3.jpg"
        />
      </div>
    </div>
  </div>
);

HomeFeedbacksSection.propTypes = {
  technicalIssueAlert: any,
};

export default HomeFeedbacksSection;
