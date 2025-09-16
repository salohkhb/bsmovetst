import styles from './index.module.css';

export default function MapAndCoverage({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.mapCol}>
          <img src="/images/france1.png" alt="Carte Île-de-France" className={styles.map}/>
        </div>
        <div className={styles.textCol}>
          <h3>{data.title}</h3>
          <p>{data.text}</p>
        </div>
      </div>
    </section>
  );
}
