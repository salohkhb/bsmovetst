import styles from './index.module.css';

export default function CallToAction({ data }) {
  return (
    <section className={styles.cta}>
      <div className={styles.content}>
        <div>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
        <a href="/contact" className={styles.button}>
          {data.button}
        </a>
      </div>
    </section>
  );
}
