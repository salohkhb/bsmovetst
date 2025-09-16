// components/Layout/index.jsx
import React from 'react';
import styles from './index.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.page}>
      {children}
    </div>
  );
}
