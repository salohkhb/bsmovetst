import styles from "../index.module.css";
import { Button } from "@mui/material";
import Link from "next/link";
import Routes from "../../../helpers/routes";

const VehicleRentFooter = () => {
  return (
    <footer className={styles.vehicle_rent_footer__main}>
      <article style={{ color: "rgb(56, 199, 152)" }}>
        {"Vous n'êtes pas sur ?"}
      </article>
      <h1
        className={styles.vehicle_rent_footer__content}
        style={{ color: "white" }}
      >
        Calculer votre volume gratuitement grâce à notre outil calculateur de
        volume
      </h1>
      <Link href={Routes.VOLUME_CALCULATOR_PAGE}>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "1px solid white" }}
        >
          Calculer mon volume
        </Button>
      </Link>
    </footer>
  );
};

export default VehicleRentFooter;
