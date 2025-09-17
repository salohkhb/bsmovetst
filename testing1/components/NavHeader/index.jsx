"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import styles from "./index.module.css";

export default function NavHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent page scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  // Close menu after clicking a link
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

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

        {/* Hamburger Button (Mobile only) */}
        <button 
          className={styles.menuToggle} 
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>

        {/* Desktop / Mobile Nav */}
        <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
          {/* Close button inside menu */}
          <button 
            className={styles.closeBtn} 
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>

          <Link href="/achats" onClick={handleLinkClick}>Achats matériels</Link>
          <Link href="/monte-meuble" onClick={handleLinkClick}>Location monte-meuble</Link>
          <Link href="/camion" onClick={handleLinkClick}>Location camion</Link>
          <Link href="/contact" className={styles.contactBtn} onClick={handleLinkClick}>
            Contact
          </Link>
          <Link href="/blog" onClick={handleLinkClick}>Blog</Link>
          <Link href="/devis" className={styles.cta} onClick={handleLinkClick}>
            Devis gratuit
          </Link>
        </nav>
      </div>
    </header>
  );
}
