import { useRent } from "../../../../hooks/rent";
import { useFormik } from "formik";
import Image from "next/legacy/image";
import DatePicker from "../../../../components/Pickers/DatePicker";
import MUISelect from "@mui/material/Select";
import MUIMenuItem from "@mui/material/MenuItem";
import { useEffect, useMemo, useState } from "react";
import Button from "../../../../components/Button";
import {
  CURRENCY,
  FULL_DAY_DURATION,
  HALF_DAY_DURATION,
  PASSAGE_DURATION,
} from "../../../../helpers/constants";
import GeolocationInput from "../../../../components/GeolocationInput";
import { useRouter } from "next/router";
import Routes from "../../../../helpers/routes";
import FloorSelect from "../../../../components/Utilities/FloorSelect";
import { getLiftPrice, getMoversPrice } from "../../../../helpers/prices";
import styles from "../../index.module.css";

const LiftRentSelectionHeader = () => {
  const {
    rent: { lift = {}, movers = {} } = {},
    handleLiftRentByKey,
    handleMoversRentByKey,
  } = useRent();

  return (
    <header className={styles.rent_selection__header}>
      <section className={styles.rent_selection__filters}>
        <div className={styles.rent_selection__filter}>
          <label>Départ</label>
          <GeolocationInput
            initialInputValue={lift?.startAddress?.placeName}
            name={"startAddress"}
            onChange={(value) => handleLiftRentByKey("startAddress", value)}
            placeholder={"Adresse de départ"}
            withoutLabel
          />
        </div>
        <div className={styles.rent_selection__filter}>
          <label>Date</label>
          <DatePicker
            defaultValue={null}
            name="startDate"
            value={lift?.startDate}
            handleChange={(newValue) => {
              handleLiftRentByKey("startDate", newValue);
            }}
            fullWidth={true}
          />
        </div>
        <div className={styles.rent_selection__filter}>
          <label>Durée</label>
          <MUISelect
            label=""
            name="duration"
            value={lift?.duration}
            onChange={(event) => {
              handleLiftRentByKey("duration", event.target.value);
            }}
          >
            <MUIMenuItem value={PASSAGE_DURATION}>1h</MUIMenuItem>
            <MUIMenuItem value={HALF_DAY_DURATION}>4h</MUIMenuItem>
            <MUIMenuItem value={FULL_DAY_DURATION}>8h</MUIMenuItem>
          </MUISelect>
        </div>
        <div className={styles.rent_selection__filter}>
          <label>Etages</label>
          <FloorSelect
            label=""
            name={"floors"}
            onChange={(event) =>
              handleLiftRentByKey("floors", event.target.value)
            }
            value={lift?.floors}
          />
        </div>
        <div className={styles.rent_selection__filter}>
          <label>Déménageurs</label>
          <MUISelect
            label=""
            name="nbMovingMen"
            value={movers?.nbMovingMen}
            onChange={(event) => {
              handleMoversRentByKey("nbMovingMen", event.target.value);
              handleMoversRentByKey("present", !!event.target.value);
              handleMoversRentByKey(
                "price",
                getMoversPrice(event.target.value, lift.duration)
              );
            }}
          >
            <MUIMenuItem value={1}>1</MUIMenuItem>
            <MUIMenuItem value={2}>2</MUIMenuItem>
            <MUIMenuItem value={3}>3</MUIMenuItem>
            <MUIMenuItem value={4}>4</MUIMenuItem>
          </MUISelect>
        </div>
      </section>
    </header>
  );
};

function getPriceForItem(item, lift = {}) {
  if (!lift) return;
  switch (item.name) {
    case "Échelle électrique":
      return getLiftPrice(
        lift.km,
        "Échelle électrique",
        lift.duration,
        lift.floors
      );
    case "Monte meuble auto-porté":
      return getLiftPrice(
        lift.km,
        "Monte meuble auto-porté",
        lift.duration,
        lift.floors
      );
    case "Monte meuble tracté":
      return getLiftPrice(
        lift.km,
        "Monte meuble tracté",
        lift.duration,
        lift.floors
      );
    default:
      return getLiftPrice(
        lift.km,
        "Monte meuble tracté",
        lift.duration,
        lift.floors
      );
  }
}

const RentCard = ({ item }) => {
  const { handleLiftRent, handleMoversRent, rent = {} } = useRent();
  const router = useRouter();

  function handleRentItem() {
    handleLiftRent({
      ...rent.lift,
      items: [{ ...item }],
      totalPrice: getPriceForItem(item, rent.lift),
    });
    handleMoversRent({
      ...rent.movers,
      totalPrice: getMoversPrice(rent.movers?.nbMovingMen, rent.lift?.duration),
    });
    router.push(Routes.LIFT_RENT_PAGE_SUMMARY);
  }
  return (
    <div className={styles.rent_selection__card}>
      <div className={styles.rent_selection__card_content}>
        <div className={styles.rent_selection__card_image_container}>
          <div style={{ position: "absolute", width: "100%", height: "100%" }}>
            <Image
              layout="fill"
              src={item.src || "/images/logo.png"}
              alt={item.name}
              className={styles.vehicle_illustration}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "260px",
              gap: "1em",
            }}
          >
            <h3>{item.name}</h3>
            <span style={{ color: "#8B9197" }}>{item.description}</span>
          </div>
        </div>
        <div className={styles.rent_selection__card_action_and_price}>
          <h2 style={{ margin: 0, padding: 0 }}>
            {getPriceForItem(item, rent?.lift)}
            {CURRENCY.EUR}
          </h2>
          <div>
            <Button onClick={handleRentItem}>Louer ce monte-meubles</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LiftRentSelectionContent = ({ list = [] }) => (
  <div
    style={{
      padding: "56px 20%",
      backgroundColor: "#F9FAFB",
      display: "flex",
      flexDirection: "column",
      gap: "43px",
    }}
  >
    <div
      style={{
        backgroundColor: "#F1F9F5",
        display: "flex",
        flexDirection: "column",
        gap: "0.5em",
        padding: "30px",
      }}
    >
      <h3>Information</h3>
      <p style={{ maxWidth: "75%", color: "#8B9197" }}>
        Vous allez commencer votre pré-réservation de monte-meuble. Une fois
        terminée, l'agence concernée prendra contact avec vous pour valider
        votre dossier ainsi que la disponibilité du monte-meuble.
      </p>
    </div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2 style={{ padding: 0, margin: 0 }}>Choisissez votre véhicule</h2>
      <p style={{ color: "#8B9197" }}>
        {list.length} véhicules trouvés à vos dates
      </p>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          minWidth: "100%",
          padding: 0,
        }}
      >
        {list.map((item, index) => (
          <RentCard key={item.id + index} item={item} />
        ))}
      </ul>
    </div>
  </div>
);

const ITEM_LIST = [
  {
    id: 1,
    name: "Échelle électrique",
    description:
      "Échelle électrique utilisée pour les étages assez bas et les accès les plus compliqués ( se monte et se démonte sur place )",
    src: "/images/echelle-electrique.png",
  },
  {
    id: 2,
    name: "Monte meuble tracté",
    description:
      "Le tractée utilisable si l’entrée fait moins de 2m2 et que ça ne dépasse pas 6 étages",
    src: "/images/lifter-1.png",
  },
  {
    id: 3,
    name: "Monte meuble auto-porté",
    description:
      "Monte meuble auto-porteé, pas utilisable si l'entrée fait moins de 2m2, convient aux étages au delà de 6",
    src: "/images/lifter-2.png",
  },
];

const RentSelection = () => {
  const { rent = {} } = useRent();
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setItemList(computeList());
  }, [rent?.lift?.floors]);

  function computeList() {
    const itemList = [];
    if (rent?.lift?.isEntrancePresent && rent?.lift?.entranceNotTallEnough) {
      if (rent?.lift?.floors <= 6) {
        itemList.push(ITEM_LIST[0], ITEM_LIST[1]);
      }
    } else {
      if (rent?.lift?.floors > 6) {
        itemList.push(ITEM_LIST[2]);
      } else {
        itemList.push(ITEM_LIST[0], ITEM_LIST[1], ITEM_LIST[2]);
      }
    }
    return itemList;
  }

  return (
    <section>
      <article>
        <LiftRentSelectionHeader />
        <LiftRentSelectionContent list={itemList} />
      </article>
    </section>
  );
};

export default RentSelection;
