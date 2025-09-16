import styles from './index.module.css';

export default function HeroSection({ data }) {
  if (!data) return null; // évite un rendu vide au serveur

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <div className={styles.buttons}>
            <a href="/devis" className={styles.btnPrimary}>
              Choisir votre devis gratuit
            </a>
            <a href="/contact" className={styles.btnSecondary}>
              Contactez-nous
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
