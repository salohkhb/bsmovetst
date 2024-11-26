import Link from "next/link";
import styles from "./index.module.css";

const Testemonial = () => {
  return (
    <div className={styles.container}>
      <p className={styles.p}>
        Voir egalement nos astuces et conseils <br />
        pour un demenagement parfait
      </p>
      <Link href='/Contactez-nous' className={styles.button}>
        Astuces et conseils
      </Link>
    </div>
  );
};

export default Testemonial;