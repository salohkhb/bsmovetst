// components/WhyChooseUs/index.jsx
import styles from './index.module.css';
import { FaCheckCircle, FaStar, FaTruck, FaShieldAlt } from 'react-icons/fa';

const icons = [FaCheckCircle, FaStar, FaTruck, FaShieldAlt];

export default function WhyChooseUs({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{data.title}</h2>
        <div className={styles.grid}>
          {data.features.map((f, i) => {
            const Icon = icons[i % icons.length]; // Cycle à travers les icônes
            return (
              <div className={styles.card} key={i}>
                <div className={styles.icon}>
                  <Icon />
                </div>
                <h3>{`Avantage ${i + 1}`}</h3>
                <p className={styles.feature}>{f}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

