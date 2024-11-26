import Routes from "../../../helpers/routes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "../../../components/Button";
import styles from "../../Rent/Vehicle/Validation/index.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useGlobal } from "../../../hooks/global";
import messages from "../../Rent/Vehicle/Validation/messages";
const EstimateValidationPage = () => {
  const router = useRouter();
  const { resetRedirect } = useGlobal();

  useEffect(() => {
    if (typeof window === "undefined") return;
    resetRedirect();
  }, []);

  function handleBackToMainPage() {
    return router.push(Routes.HOME_PAGE);
  }
  return (
    <section className={styles.confirm_vehicle_rent_container}>
      <div style={{ height: "7em" }} />
      <div>
        <CheckCircleIcon className={styles.confirm_vehicle_rent_icon} />
      </div>
      <div>
        <h1 className={styles.confirm_vehicle_rent_title}>
          Demande de devis confirmée
        </h1>
        <p className={styles.confirm_vehicle_rent_content}>
          Votre demande de devis a été prise en compte, nous vous recontacterons
          dans les plus bref délais.
        </p>
      </div>
      <div className={styles.confirm_vehicle_rent_action_container}>
        <Button outlined onClick={handleBackToMainPage}>
          Retour à l'accueil
        </Button>
      </div>
    </section>
  );
};

export default EstimateValidationPage;
