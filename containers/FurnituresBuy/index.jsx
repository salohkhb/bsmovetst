import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/legacy/image";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
//
import StickyBasket from "../../components/StickyBasket";
import FurnitureCard from "../../components/FurnitureCard";
import Subtitle from "../../components/Texts/Subtitle.jsx";

import { useAlert } from "../../hooks/alert";
import { useLoading } from "../../hooks/loading";
import api from "../../helpers/api";
import { ALERT } from "../../helpers/constants";
import messages from "./messages";
import styles from "./index.module.css";
import { useGlobal } from "../../hooks/global";

const darkWithOpacity = "rgba(27, 32, 50, 0.4)";
//
const S = {};

S.Category = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5em;
  width: 150px;
  border-radius: 12px;
  font-weight: 600;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.mainGreen : darkWithOpacity};
  background-color: ${({ theme, active }) =>
    active ? theme.colors.mainGreen : theme.colors.lightGrey};
  color: ${({ theme, active }) =>
    active ? theme.colors.white : darkWithOpacity};
`;

const categories = [
  { label: messages.items.filters.all, filter: null, value: 0 },
  {
    label: messages.items.filters.boxes,
    filter: '"standard"',
    value: 1,
  },
  {
    label: messages.items.filters.bonding,
    filter: '"fragile"',
    filter_two: '"protection"',
    multiple: true,
    value: 2,
  },
  { label: messages.items.filters.others, filter: '"others"', value: 3 },
];
//
const Categories = ({ categories = [], handleFetchItems }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  async function handleCategoryChange(category) {
    setActiveCategory(category?.value);
    if (category.multiple) {
      handleFetchItems([category.filter, category.filter_two], true);
    } else {
      handleFetchItems(category?.filter);
    }
  }
  return (
    <div className={styles.furnitures_buy_items_categories_container}>
      {categories?.map((category) => (
        <S.Category
          key={category?.label}
          active={category?.value === activeCategory}
          onClick={() => handleCategoryChange(category)}
        >
          {category?.label}
        </S.Category>
      ))}
    </div>
  );
};

const EmptyItemsList = () => (
  <div className={styles.empty_items_list}>{messages.emptyList}</div>
);

const FurnituresBuyItems = () => {
  const [itemsList, setItemsList] = useState([]);
  const { setAlert = () => {} } = useAlert();
  const { setGlobalLoading = () => {} } = useLoading();

  async function handleFetchItems(filter, multiple = false) {
    setGlobalLoading(true);
    let response;
    if (multiple) {
      console.log("filter : ", filter);
      response = await api.get(
        `/Products?filter={"where": { "or": [{ "category": ${filter[0]} }, { "category": ${filter[1]} }] } }`
      );
    } else {
      response = filter
        ? await api.get(
            `/Products?filter={"where": { "category": ${filter} } }`
          )
        : await api.get("/Products");
    }
    setGlobalLoading(false);
    if (!response || !response.ok) {
      setAlert({
        severity: ALERT.ERROR,
        content: messages.alert.error.noProduct,
      });
      return setItemsList([]);
    }
    setItemsList(response?.data);
  }

  useEffect(() => {
    handleFetchItems();
  }, []);

  return (
    <div className={styles.furnitures_buy_items_container}>
      <div id="furnitures_container" className={styles.furnitures_buy_items}>
        <div className={styles.furnitures_buy_items_container}>
          <Categories
            handleFetchItems={handleFetchItems}
            categories={categories}
          />
        </div>
        {itemsList?.length ? (
          <div className={styles.furnitures_buy_items_grid}>
            <div className={styles.furnitures_buy_items_grid_content}>
              {itemsList?.map((item, id) => (
                <FurnitureCard key={id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyItemsList />
        )}
      </div>
    </div>
  );
};

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

const FurnituresBuyContainer = () => {
  const {
    global: { screenWidth },
  } = useGlobal();
  //
  function scrollIntoView() {
    document
      .getElementById("furnitures_container")
      .scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <StickyBasket />
      <div className={styles.container}>
        <div className={styles.furnitures_buy_description}>
          {screenWidth && screenWidth >= 750 ? (
            <>
              <div className={styles.furnitures_buy_description_content}>
                <Subtitle>{messages.description.title}</Subtitle>
                <div className={styles.furnitures_buy_description_content_text}>
                  {messages.description.content}
                </div>
                <div
                  className={styles.furnitures_buy_description_action}
                  onClick={scrollIntoView}
                >
                  <div>{messages.description.action}</div>
                  <ArrowDownwardIcon
                    className={styles.furnitures_buy_description_action_icon}
                  />
                </div>
              </div>
              <div className={styles.furnitures_buy_description_illustration}>
                <Image
                  className={styles.furnitures_buy_description_illustration_img}
                  layout="fill"
                  src="/images/prestation_3.png"
                  alt="illustration_achat_fournitures"
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.furnitures_buy_description_illustration}>
                <Image
                  className={styles.furnitures_buy_description_illustration_img}
                  layout="fill"
                  src="/images/prestation_3.png"
                  alt="illustration_achat_fournitures"
                />
              </div>
              <div className={styles.furnitures_buy_description_content}>
                <Subtitle>{messages.description.title}</Subtitle>
                <div className={styles.furnitures_buy_description_content_text}>
                  {messages.description.content}
                </div>
                <div
                  className={styles.furnitures_buy_description_action}
                  onClick={scrollIntoView}
                >
                  <div>{messages.description.action}</div>
                  <div
                    className={styles.furnitures_buy_description_action_icon}
                  >
                    <ArrowDownwardIcon />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <FurnituresBuyItems />
        <footer className={styles.furnitures_buy_footer}>
          <section className={styles.furnitures_buy_footer_content}>
            <div className={styles.furnitures_buy_footer_title}>
              {messages.footer.title}
            </div>
            <div className={styles.furnitures_buy_footer_subtitle}>
              {messages.footer.subtitle}
            </div>
            <div className={styles.furnitures_buy_footer_socials}>
              {socials.map((social) => (
                <nav className={styles.furnitures_buy_footer_social_nav}>
                  <a
                    target="_blank"
                    href={social.link}
                    className={styles.furnitures_buy_footer_social_wrapper}
                  >
                    <Image
                      id={social.id}
                      quality={100}
                      className={
                        styles.furnitures_buy_footer_social_logo_illustration
                      }
                      layout="fill"
                      src={social.img}
                      alt={social.alt}
                    />
                  </a>
                  <a target="_blank" href={social.link}>
                    <label
                      htmlFor={social.id}
                      className={styles.furnitures_buy_footer_social_logo_label}
                    >
                      {social.label}
                    </label>
                  </a>
                </nav>
              ))}
            </div>
          </section>
        </footer>
      </div>
    </div>
  );
};

export default FurnituresBuyContainer;
