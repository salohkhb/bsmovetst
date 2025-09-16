import styles from './index.module.css';

export default function IntroSection({ data }) {
  return (
    <section className={styles.intro}>
      <h2>{data.title}</h2>
      <p>{data.text}</p>
    </section>
  );
}
