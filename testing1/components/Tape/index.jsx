import styles from './index.module.css';

export default function Tape() {
  const items = [
    "🚚 Déménagement rapide",
    "📦 Cartons fournis",
    "🏠 Service clé en main",
    "💪 Équipe expérimentée",    
    "⭐ 100% clients satisfaits",
  ];

  return (
    <div className={styles.tape}>
      <div className={styles.track}>
        {items.map((item, i) => (
          <span key={i} className={styles.item}>{item}</span>
        ))}
        {/* duplicate for infinite loop */}
        {items.map((item, i) => (
          <span key={`dup-${i}`} className={styles.item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
