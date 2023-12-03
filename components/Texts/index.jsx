import styles from './index.module.css';

export const Subtitle = ({ children, withMargin = true }) => (
  <h2 style={{ margin: withMargin ? '' : 0 }} className={styles.custom_h2}>{children}</h2>
)
