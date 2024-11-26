import Routes from "../../../../helpers/routes";
import styles from "./index.module.css";
import messages from "./messages";
import Button from "../../../../components/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";
import { useRent } from "../../../../hooks/rent";
import { useGlobal } from "../../../../hooks/global";
import { useEffect } from "react";

const LiftRentValidation = () => {
  const router = useRouter();
  const { rent, clearRent } = useRent();
  const { resetRedirect } = useGlobal();

  useEffect(() => {
    if (typeof window === "undefined") return;
    resetRedirect();
  }, [rent]);

  function handleBackToMainPage() {
    clearRent();
    return router.push(Routes.HOME_PAGE);
  }

  function handleBackToProfile() {
    clearRent();
    return router.push(Routes.PROFIL_PAGE);
  }

  return (
    <div className={styles.confirm_lift_rent_container}>
      <div>
        <CheckCircleIcon className={styles.confirm_lift_rent_icon} />
      </div>
      <div>
        <h1 className={styles.confirm_lift_rent_title}>
          {messages.title["lift"]}
        </h1>
        <div className={styles.confirm_lift_rent_content}>
          <span>{messages.content.text}</span>
          <span
            className={styles.confirm_lift_rent_link}
            onClick={handleBackToProfile}
          >
            {messages.content.link}
          </span>
        </div>
      </div>
      <div className={styles.confirm_lift_rent_contact_informations}>
        <span>{messages.contact}</span>
      </div>
      <div className={styles.confirm_lift_rent_action_container}>
        <Button outlined onClick={handleBackToMainPage}>
          {messages.action}
        </Button>
      </div>
    </div>
  );
};
export default LiftRentValidation;
