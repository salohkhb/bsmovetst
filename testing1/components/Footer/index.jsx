import styles from './index.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Logo */}
        <div className={styles.block}>
          <Image src="/images/logo.png" alt="BsMove logo" width={140} height={50} />
        </div>

        {/* Contact */}
        <div className={styles.block}>
          <h4>Contact</h4>
          <p>01.83.38.98.50</p>
          <a href="mailto:contact@bsmove.com">contact@bsmove.com</a>
          <div className={styles.socials}>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* Services */}
        <div className={styles.block}>
          <h4>Services</h4>
          <Link href="/services/demenagement">Déménagement</Link>
          <Link href="/services/location-camions">Location de camions</Link>
          <Link href="/services/location-monte-meuble">Location de monte-meuble</Link>
          <Link href="/services/achat-materiels">Achat matériels</Link>
        </div>

        {/* Légales */}
        <div className={styles.block}>
          <h4>Légales</h4>
          <Link href="/cgu">C.G.U</Link>
          <Link href="/politique-confidentialite">Politiques de confidentialité</Link>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} BS Move - Tous droits réservés</p>
        <div className={styles.payments}>
          <Image src="/images/mastercard.png" alt="Mastercard" width={40} height={25} />
          <Image src="/images/visa.png" alt="Visa" width={40} height={25} />
        </div>
      </div>
    </footer>
  );
}
