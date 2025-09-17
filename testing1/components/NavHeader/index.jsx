"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import styles from "./index.module.css";

export default function NavHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.help}>
          <Link href="tel:0183389850">Besoin d’aide ? 01.83.38.98.50</Link>
        </div>
        <div className={styles.icons}>
          <Link href="/account"><FaUser /></Link>
          <Link href="/cart" className={styles.cart}>
            <FaShoppingCart />
            <span className={styles.cartBadge}>0</span>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="BsMove logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Hamburger Button (Mobile) */}
        <button 
          className={styles.menuToggle} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop / Mobile Nav */}
        <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
          <Link href="/achats">Achats matériels</Link>
          <Link href="/monte-meuble">Location monte-meuble</Link>
          <Link href="/camion">Location camion</Link>
          <Link href="/contact" className={styles.contactBtn}>
            Contact
          </Link>
          <Link href="/blog">Blog</Link>
          <Link href="/devis" className={styles.cta}>
            Devis gratuit
          </Link>
        </nav>
      </div>
    </header>
  );
}
