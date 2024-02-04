import Image from "next/legacy/image";
import { string } from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";

import messages from "./messages";
import styles from "./index.module.css";
import Logo from "../Logo";
import Routes from "../../helpers/routes";
import SocialsComponent from "../Socials";

const MainFooter = () => {
  const router = useRouter();
  return (
    <section className={styles.main_footer_container}>
      <section className={styles.main_footer_right}>
        <div
          className={styles.main_footer_blocks}
          onClick={() => router.push(Routes.HOME_PAGE)}
        >
          <Link href={Routes.HOME_PAGE}>
            <div className={styles.logo_block}>
              <Logo />
            </div>
          </Link>
        </div>
        <section className={styles.main_footer_blocks}>
          <span className={styles.main_footer_blocks_title}>
            {messages.mainFooter.contactsBlock.title}
          </span>
          <a
            href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER}`}
            className={styles.main_footer_blocks_content}
          >
            {process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER}
          </a>
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
            className={styles.main_footer_blocks_content}
          >
            {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
          </a>
          <section className={styles.main_footer_social_block}>
            <SocialsComponent little noLabel />
          </section>
        </section>
        <section className={styles.main_footer_blocks}>
          <span className={styles.main_footer_blocks_title}>
            {messages.mainFooter.servicesBlock.title}
          </span>
          <Link
            href={Routes.ESTIMATE_DETAILS_PAGE}
            className={styles.main_footer_blocks_content}
          >
            {messages.mainFooter.servicesBlock.moving}
          </Link>
          <Link
            href={{
              pathname: Routes.VEHICLE_RENT_PAGE,
              query: { tab: "vehicle" },
            }}
            className={styles.main_footer_blocks_content}
          >
            {messages.mainFooter.servicesBlock.vehicleRent}
          </Link>
          <Link
            href={{
              pathname: Routes.VEHICLE_RENT_PAGE,
              query: { tab: "lift" },
            }}
            className={styles.main_footer_blocks_content}
          >
            {messages.mainFooter.servicesBlock.liftRent}
          </Link>
          <Link
            href={Routes.FURNITURES_BUY_PAGE}
            className={styles.main_footer_blocks_content}
          >
            {messages.mainFooter.servicesBlock.furnituresBuy}
          </Link>
        </section>
        <section className={styles.main_footer_blocks}>
          <Link href={Routes.CGU} className={styles.main_footer_blocks_title}>
            {messages.mainFooter.legalsBlock.title}
          </Link>
          <div className={styles.main_footer_blocks_content}>
            {messages.mainFooter.legalsBlock.cgu}
          </div>
          <div className={styles.main_footer_blocks_content}>
            {messages.mainFooter.legalsBlock.confidentialPolitics}
          </div>
        </section>
      </section>
    </section>
  );
};

const ShopFooter = () => {
  return <div>Shop footer</div>;
};

const SecondaryFooter = () => (
  <section className={styles.secondary_footer_container}>
    <div className={styles.secondary_footer_left}>{messages.copyright}</div>
    <div className={styles.secondary_footer_right}>
      <section className={styles.secondary_footer_logo_container}>
        <Image
          quality={100}
          className={styles.secondary_footer_logo_component}
          layout="fill"
          src="/images/logo_mastercard.png"
          alt="footer_logo_mastercard"
        />
      </section>
      <section className={styles.secondary_footer_logo_container}>
        <Image
          quality={100}
          className={styles.secondary_footer_logo_component}
          layout="fill"
          src="/images/logo_visa.png"
          alt="footer_logo_visa"
        />
      </section>
      <section className={styles.secondary_footer_logo_container}>
        <Image
          quality={100}
          className={styles.secondary_footer_logo_component}
          layout="fill"
          src="/images/logo_paypal.png"
          alt="footer_logo_paypal"
        />
      </section>
    </div>
  </section>
);

// Footer type can be main or shop

const Footer = ({ type = "main" }) => {
  return (
    <footer className={styles.footer_container}>
      {type === "main" ? <MainFooter /> : <ShopFooter />}
      <SecondaryFooter />
    </footer>
  );
};

Footer.propTypes = {
  type: string,
};

export default Footer;
