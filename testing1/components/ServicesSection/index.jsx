import styles from './index.module.css';

export default function ServicesSection({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.desc}>{data.description}</p>
        <div className={styles.grid}>
          {data.items.map((s, i) => (
            <div className={styles.card} key={i}>
              {/* Service image/icon */}
              {s.image && (
                <div className={styles.iconWrapper}>
                  <img src={s.image} alt={s.title} className={styles.icon} />
                </div>
              )}
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a className={styles.btn} href="/services">
                Voir
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
