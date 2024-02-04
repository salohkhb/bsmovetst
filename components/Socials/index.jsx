import styles from "../../containers/FurnituresBuy/index.module.css";
import Image from "next/legacy/image";

const socials = [
  {
    id: "social-fb",
    label: "Facebook",
    img: "/images/logo-fb.png",
    link: "https://m.facebook.com/profile.php/?id=100080108089416",
    alt: "Logo with link to Facebook",
  },
  {
    id: "social-insta",
    label: "Instagram",
    img: "/images/logo-instagram.png",
    link: "https://www.instagram.com/bsmovedemenagement/",
    alt: "Logo with link to Instagram",
  },
  {
    id: "social-linkedin",
    label: "LinkedIn",
    img: "/images/logo-linkedin.png",
    link: "https://www.linkedin.com/in/bs-move-d%C3%A9m%C3%A9nagement-4449282a1?trk=contact-info",
    alt: "Logo with link to LinkedIn",
  },
  {
    id: "social-youtube",
    label: "YouTube",
    img: "/images/logo-yt.webp",
    link: "https://www.youtube.com/@Bsmovedemenagement",
    alt: "Logo with link to YouTube",
  },
];

const SocialsComponent = ({ little = false, noLabel = false }) => {
  return (
    <>
      {socials.map((social) => (
        <nav
          key={social.id}
          className={styles.furnitures_buy_footer_social_nav}
        >
          <a
            target="_blank"
            rel="noreferrer"
            href={social.link}
            className={
              little
                ? styles.furnitures_buy_footer_social_wrapper_little
                : styles.furnitures_buy_footer_social_wrapper
            }
          >
            <Image
              id={social.id}
              quality={100}
              className={styles.furnitures_buy_footer_social_logo_illustration}
              layout="fill"
              src={social.img}
              alt={social.alt}
            />
          </a>
          {noLabel ? null : (
            <a target="_blank" rel="noreferrer" href={social.link}>
              <label
                htmlFor={social.id}
                className={styles.furnitures_buy_footer_social_logo_label}
              >
                {social.label}
              </label>
            </a>
          )}
        </nav>
      ))}
    </>
  );
};

export default SocialsComponent;
