import { useRent } from "../../../../hooks/rent";
import Image from "next/legacy/image";
import DatePicker from "../../../../components/Pickers/DatePicker";
import MUISelect from "@mui/material/Select";
import MUIMenuItem from "@mui/material/MenuItem";
import Button from "../../../../components/Button";
import {
  CURRENCY,
  FULL_DAY_DURATION,
  HALF_DAY_DURATION,
  VEHICLE_LIST,
} from "../../../../helpers/constants";
import GeolocationInput from "../../../../components/GeolocationInput";
import { useRouter } from "next/router";
import Routes from "../../../../helpers/routes";
import Counter from "../../../../components/Counter";
import styles from "../../index.module.css";
import { getMoversPrice } from "../../../../helpers/prices";

const RentSelectionHeader = () => {
  const {
    rent: { vehicle, movers },
    handleVehicleRentByKey,
    handleMoversRentByKey,
  } = useRent();

  return (
    <header className={styles.rent_selection__header}>
      <section className={styles.rent_selection__filters}>
        <div className={styles.rent_selection__filter}>
          <label>Départ</label>
          <GeolocationInput
            initialInputValue={vehicle?.startAddress?.placeName}
            name={"startAddress"}
            onChange={(value) => handleVehicleRentByKey("startAddress", value)}
            placeholder={"Adresse de départ"}
            withoutLabel
          />
        </div>
        <div className={styles.rent_selection__filter}>
          <label>Arrivée</label>
          <GeolocationInput
            initialInputValue={vehicle?.endAddress?.placeName}
            name={"endAddress"}
            onChange={(value) => handleVehicleRentByKey("endAddress", value)}
            placeholder={"Adresse d'arrivée"}
            withoutLabel
          />
        </div>
        <div className={styles.rent_selection__filter}>
          <label>Date</label>
          <DatePicker
            defaultValue={null}
            name="startDate"
            value={vehicle?.startDate}
            handleChange={(value) => {
              handleVehicleRentByKey("startDate", value);
            }}
            fullWidth={true}
          />
        </div>
        <div className={styles.rent_selection__filter}>
          <label>Durée</label>
          <MUISelect
            label=""
            name="duration"
            value={vehicle?.duration}
            onChange={(event) =>
              handleVehicleRentByKey("duration", event.target.value)
            }
          >
            <MUIMenuItem value={HALF_DAY_DURATION}>4h</MUIMenuItem>
            <MUIMenuItem value={FULL_DAY_DURATION}>8h</MUIMenuItem>
          </MUISelect>
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
                getMoversPrice(event.target.value, vehicle.duration)
              );
            }}
          >
            <MUIMenuItem value={1}>1</MUIMenuItem>
            <MUIMenuItem value={2}>2</MUIMenuItem>
            <MUIMenuItem value={3}>3</MUIMenuItem>
            <MUIMenuItem value={4}>4</MUIMenuItem>
            <MUIMenuItem value={5}>5</MUIMenuItem>
            <MUIMenuItem value={6}>6</MUIMenuItem>
            <MUIMenuItem value={7}>7</MUIMenuItem>
            <MUIMenuItem value={8}>8</MUIMenuItem>
          </MUISelect>
        </div>
      </section>
    </header>
  );
};

const RentCard = ({ item }) => {
  const {
    handleVehicleRent,
    rent: { vehicle = {}, km },
  } = useRent();

  function getVehicleQuantity() {
    const vehicleFound = vehicle?.items?.find(
      (vehicleItem) => vehicleItem?.id === item?.id
    );
    return vehicleFound?.quantity ?? 0;
  }

  function handleCountInc() {
    const itemFound = vehicle?.items?.find(
      (itemList) => itemList?.id === item.id
    );
    if (itemFound) {
      const newItemList = vehicle?.items?.map((vehicleItem) => {
        return vehicleItem?.id === item.id
          ? { ...vehicleItem, quantity: vehicleItem?.quantity + 1 }
          : vehicleItem;
      });
      handleVehicleRent({
        ...vehicle,
        items: newItemList,
      });
    } else {
      handleVehicleRent({
        ...vehicle,
        items: vehicle?.items?.length
          ? [...vehicle?.items, { ...item, quantity: 1 }]
          : [{ ...item, quantity: 1 }],
      });
    }
  }
  function handleCountDec() {
    const itemFound = vehicle?.items?.find(
      (itemList) => itemList?.id === item.id
    );
    if (itemFound) {
      let newItemsList = [];
      if (itemFound?.quantity <= 1) {
        newItemsList = vehicle?.items?.filter(
          (vehicleItem) => vehicleItem?.id !== item.id
        );
      } else {
        newItemsList = vehicle?.items?.map((vehicleItem) => {
          return vehicleItem?.id === item.id
            ? { ...vehicleItem, quantity: vehicleItem?.quantity - 1 }
            : vehicleItem;
        });
      }
      handleVehicleRent({
        ...vehicle,
        items: newItemsList,
      });
    }
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
            justifyContent: "space-between",
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
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              gap: "0.5em",
            }}
          >
            <h2 style={{ margin: 0, padding: 0 }}>Quantitée</h2>
            <Counter
              minValue={0}
              maxValue={10}
              value={getVehicleQuantity()}
              handleInc={handleCountInc}
              handleDec={handleCountDec}
              showHelperMessage={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RentSelectionContent = ({ list = [] }) => {
  const router = useRouter();
  const { rent: { vehicle: { totalPrice = 0 } = {} } = {} } = useRent();

  function handleValidate() {
    router.push(Routes.VEHICLE_RENT_PAGE_SUMMARY);
  }
  return (
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
          Vous allez commencer votre pré-réservation de véhicule de
          déménagement. Une fois terminée, l&apos;agence concernée prendra contact
          avec vous pour valider votre dossier ainsi que la disponibilité du
          véhicule.
        </p>
      </div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ padding: 0, margin: 0 , fontSize: 35}}>Choisissez votre véhicule</h1>
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
        <section className={styles.rent_selection__selection_footer}>
          <div style={{ fontWeight: "bold" }}>
            <h3>
              Total : {totalPrice}
              {CURRENCY.EUR}{" "}
            </h3>
          </div>
          <div className={styles.rent_selection__selection_footer_action}>
            <Button fullWidth onClick={handleValidate}>
              Valider les choix
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
};

const RentSelection = () => (
  <section>
    <article>
      <RentSelectionHeader />
      <RentSelectionContent list={VEHICLE_LIST} />
    </article>
  </section>
);

export default RentSelection;
