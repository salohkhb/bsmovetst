import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./index.module.css";

export default function Testimonials({ data }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{data.title}</h2>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className={styles.swiper}
        >
          {data.items.map((t, i) => (
            <SwiperSlide key={i}>
              <div className={styles.card}>
                <div className={styles.quoteIcon}>“</div>
                <p className={styles.text}>{t.text}</p>
                <div className={styles.authorBox}>
                  <img src={t.image} alt={t.name} className={styles.avatar} />
                  <div>
                    <p className={styles.name}>{t.name}</p>
                    <span className={styles.role}>{t.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
