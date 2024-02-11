import { useEffect, useState } from "react";
import styles from "../index.module.css";
import { Tabs, Tab } from "@mui/material";
import { any, number } from "prop-types";
import DatePicker from "../../../components/Pickers/DatePicker";
import { useFormik } from "formik";
import Counter from "../../../components/Counter";
import CheckBox from "../../../components/CheckBox";
import { FormControlLabel } from "@mui/material";
import Button from "../../../components/Button";
import { Button as MUIButton } from "@mui/material";
import Routes from "../../../helpers/routes";
import { useRouter } from "next/router";
import { useRent } from "../../../hooks/rent";
import MUISelect from "@mui/material/Select";
import MUIMenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import FloorSelect from "../../../components/Utilities/FloorSelect";
import GeolocationInput from "../../../components/GeolocationInput";
import {
  FULL_DAY_DURATION,
  HALF_DAY_DURATION,
  PASSAGE_DURATION,
} from "../../../helpers/constants";
import { useEstimate } from "../../../hooks/estimate";
import { getMoversPrice } from "../../../helpers/prices";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: any,
  value: any,
  index: number,
};

const VehicleRentSearchSectionVehicle = () => {
  const router = useRouter();
  const { handleVehicleRent, handleMoversRent, rent } = useRent();

  function validate(values) {
    const errors = {};
    if (!values.startAddress)
      errors.startAddress = "Merci d'ajouter une addresse de départ";
    if (!values.endAddress)
      errors.endAddress = "Merci d'ajouter une addresse d'arrivée";
    if (!values.startDate)
      errors.startDate = "Merci d'ajouter une date de départ";
    if (!values.duration) errors.duration = "Merci d'ajouter une durée";
    if (values.onlyMovingMen && !values.nbMovingMen)
      errors.nbMovingMen = "Merci d'ajouter des déménageurs";
    return errors;
  }

  function handleSubmit(values) {
    handleMoversRent({
      ...rent.movers,
      present: true,
      nbMovingMen: values.nbMovingMen,
      totalPrice: getMoversPrice(values.nbMovingMen, values.duration),
    });
    if (values.onlyMovingMen) {
      handleMoversRent({
        ...rent.movers,
        present: true,
        nbMovingMen: values.nbMovingMen,
        totalPrice: getMoversPrice(values.nbMovingMen, values.duration),
        ...values,
      });
      router.push(Routes.MOVERS_RENT_PAGE_SUMMARY);
    } else {
      handleVehicleRent(values);
      router.push(Routes.VEHICLE_RENT_PAGE_SELECTION);
    }
  }

  const formik = useFormik({
    initialValues: {
      startAddress: {},
      endAddress: {},
      startDate: null,
      duration: null,
      nbMovingMen: 0,
      onlyMovingMen: false,
      type: "vehicle",
    },
    validate,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <section>
      <form
        onSubmit={formik.handleSubmit}
        className={styles.vehicle_rent_search_section__vehicle_container}
      >
        <div className={styles.vehicle_rent_search_section__line_wrapper}>
          <div className={styles.vehicle_rent_search_section__input_wrapper}>
            <label>Départ</label>
            <GeolocationInput
              name={"startAddress"}
              onChange={(value) => formik.setFieldValue("startAddress", value)}
              placeholder={"Adresse de départ"}
              withoutLabel
            />
            {formik.errors.startAddress && formik.touched.startAddress && (
              <span style={{ color: "red" }}>{formik.errors.startAddress}</span>
            )}
          </div>
          <div className={styles.vehicle_rent_search_section__input_wrapper}>
            <label>Arrivée</label>
            <GeolocationInput
              name={"endAddress"}
              onChange={(value) => formik.setFieldValue("endAddress", value)}
              placeholder={"Adresse d'arrivée"}
              withoutLabel
            />
            {formik.errors.endAddress && formik.touched.endAddress && (
              <span style={{ color: "red" }}>{formik.errors.endAddress}</span>
            )}
          </div>
        </div>
        <div className={styles.vehicle_rent_search_section__line_wrapper}>
          <div
            className={styles.vehicle_rent_search_section__input_wrapper}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Durée de la manutention</label>
            <MUISelect
              label=""
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
            >
              <MUIMenuItem value={HALF_DAY_DURATION}>4h</MUIMenuItem>
              <MUIMenuItem value={FULL_DAY_DURATION}>8h</MUIMenuItem>
            </MUISelect>
            {formik.errors.duration && formik.touched.duration && (
              <span style={{ color: "red" }}>{formik.errors.duration}</span>
            )}
          </div>
          <div className={styles.vehicle_rent_search_section__input_wrapper}>
            <label>Date de votre déménagement</label>
            <DatePicker
              defaultValue={null}
              name="startDate"
              value={formik.values.startDate}
              handleChange={(newValue) => {
                formik.setFieldValue("startDate", newValue);
              }}
              fullWidth={true}
              error={formik.errors.startDate}
            />
            {formik.errors.startDate && formik.touched.startDate && (
              <span style={{ color: "red" }}>{formik.errors.startDate}</span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <span style={{ fontWeight: 600 }}>Nombre de déménageurs</span>
            <Counter
              minValue={0}
              value={formik.values.nbMovingMen}
              handleInc={() =>
                formik.setFieldValue(
                  "nbMovingMen",
                  formik.values.nbMovingMen + 1
                )
              }
              handleDec={() =>
                formik.setFieldValue(
                  "nbMovingMen",
                  formik.values.nbMovingMen - 1
                )
              }
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={formik.values.onlyMovingMen}
                  onChange={() =>
                    formik.setFieldValue(
                      "onlyMovingMen",
                      !formik.values.onlyMovingMen
                    )
                  }
                />
              }
              label={<label>{"Louer de la main d'œuvre uniquement"}</label>}
            />
          </div>
          <span style={{ fontStyle: "12px" }}>(En plus du chauffeur)</span>
        </div>
        {formik.errors.nbMovingMen && formik.touched.nbMovingMen ? (
          <span style={{ color: "red" }}>{formik.errors.nbMovingMen}</span>
        ) : null}
        <footer className={styles.vehicle_rent_search_section__footer}>
          <MUIButton
            type="click"
            variant="text"
            onClick={() => router.push(Routes.CONTACT_PAGE)}
            className={styles.vehicle_rent_search_section__button_contact}
          >
            Je souhaite être rappelé
          </MUIButton>
          <div className={styles.vehicle_rent_search_section__button_validate}>
            <Button type="submit">Valider et rechercher</Button>
          </div>
        </footer>
      </form>
    </section>
  );
};

export const PARIS_PIN_POINT = {
  lat: 48.866667,
  lon: 2.333333,
};

export function getPassagePrice(km) {
  return (110 + km * 0.7) * 1.2;
}
const LiftRentSection = () => {
  const router = useRouter();
  const { handleLiftRent, handleMoversRent, rent } = useRent();
  const { getKmBetweenDistances } = useEstimate();

  function validate(values) {
    const errors = {};
    if (!values.startAddress)
      errors.startAddress = "Merci d'ajouter une addresse de départ";
    if (!values.startDate)
      errors.startDate = "Merci d'ajouter une date de départ";
    if (!values.duration) errors.duration = "Merci d'ajouter une durée";
    if (values.floors === null) errors.floors = "Merci d'ajouter l'étage";
    return errors;
  }

  async function handleSubmit(values) {
    const km = await getKmBetweenDistances(PARIS_PIN_POINT, {
      lat: values.startAddress.lat,
      lon: values.startAddress.lng,
    });
    handleMoversRent({
      ...rent.movers,
      present: values.nbMovingMen > 0,
      nbMovingMen: values.nbMovingMen,
      totalPrice: getMoversPrice(values.nbMovingMen, values.duration),
      km,
    });
    handleLiftRent({
      ...rent.lift,
      present: true,
      km,
      ...values,
    });
    router.push(Routes.LIFT_RENT_PAGE_SELECTION);
  }

  const formik = useFormik({
    initialValues: {
      startAddress: {},
      startDate: null,
      duration: null,
      floors: "",
      liftType: "",
      type: "lift",
      nbMovingMen: 0,
      isEntrancePresent: false,
      entranceNotTallEnough: false,
    },
    validate,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <section>
      <form
        onSubmit={formik.handleSubmit}
        className={styles.vehicle_rent_search_section__vehicle_container}
      >
        <div className={styles.vehicle_rent_search_section__line_wrapper}>
          <div className={styles.vehicle_rent_search_section__input_wrapper}>
            <label>Votre adresse</label>
            <GeolocationInput
              name={"startAddress"}
              onChange={(value) => formik.setFieldValue("startAddress", value)}
              placeholder={"Adresse de départ"}
              withoutLabel
            />
            {formik.errors.startAddress && formik.touched.startAddress && (
              <span style={{ color: "red" }}>{formik.errors.startAddress}</span>
            )}
          </div>
          <div
            className={styles.vehicle_rent_search_section__select_input_wrapper}
          >
            <label>Etage</label>
            <FloorSelect
              label=""
              name="floors"
              value={formik.values.floors}
              onChange={formik.handleChange}
              style={{
                display: "flex !important",
                flexDirection: "column !important",
                maxWidth: "100% !important",
                minWidth: "100% !important",
                width: "100% !important",
              }}
            />
          </div>
        </div>
        <div className={styles.vehicle_rent_search_section__line_wrapper}>
          <div
            className={styles.vehicle_rent_search_section__input_wrapper}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Date</label>
            <DatePicker
              defaultValue={null}
              name="startDate"
              value={formik.values.startDate}
              handleChange={(newValue) => {
                formik.setFieldValue("startDate", newValue);
              }}
              fullWidth={true}
              error={formik.errors.startDate}
            />
            {formik.errors.startDate && formik.touched.startDate && (
              <span style={{ color: "red" }}>{formik.errors.startDate}</span>
            )}
          </div>
          <div
            className={styles.vehicle_rent_search_section__select_input_wrapper}
          >
            <label>Durée de la manutention</label>
            <MUISelect
              label=""
              name="duration"
              value={formik.values.duration}
              onChange={formik.handleChange}
            >
              <MUIMenuItem value={PASSAGE_DURATION}>Passage (1h)</MUIMenuItem>
              <MUIMenuItem value={HALF_DAY_DURATION}>
                Demi journée (4h)
              </MUIMenuItem>
              <MUIMenuItem value={FULL_DAY_DURATION}>Journée (8h)</MUIMenuItem>
            </MUISelect>
            {formik.errors.duration && formik.touched.duration && (
              <span style={{ color: "red" }}>{formik.errors.duration}</span>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1em",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: 600 }}>Nombre de déménageurs</span>
            <Counter
              minValue={0}
              value={formik.values.nbMovingMen}
              handleInc={() =>
                formik.setFieldValue(
                  "nbMovingMen",
                  formik.values.nbMovingMen + 1
                )
              }
              handleDec={() =>
                formik.setFieldValue(
                  "nbMovingMen",
                  formik.values.nbMovingMen - 1
                )
              }
            />
            <span>(L'opérateur est déjà inclus)</span>
          </div>
          <section
            style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
          >
            <FormControlLabel
              control={
                <CheckBox
                  checked={formik.values.isEntrancePresent}
                  onChange={() =>
                    formik.setFieldValue(
                      "isEntrancePresent",
                      !formik.values.isEntrancePresent
                    )
                  }
                />
              }
              label={<label>{"J'ai un passage ou une cour"}</label>}
            />
            <Fade in={formik.values.isEntrancePresent}>
              <FormControlLabel
                control={
                  <CheckBox
                    checked={formik.values.entranceNotTallEnough}
                    onChange={() =>
                      formik.setFieldValue(
                        "entranceNotTallEnough",
                        !formik.values.entranceNotTallEnough
                      )
                    }
                  />
                }
                label={
                  <label>{"Mon passage fait moins de 2,2m de hauteur"}</label>
                }
              />
            </Fade>
          </section>
        </div>
        <footer
          style={{
            display: "flex",
            paddingTop: "1em",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <MUIButton
            type="click"
            variant="text"
            onClick={() => router.push(Routes.CONTACT_PAGE)}
            sx={{
              color: "black",
              fontWeight: 600,
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            Je souhaite être rappelé
          </MUIButton>
          <div style={{ width: "25%" }}>
            <Button type="submit">Valider et rechercher</Button>
          </div>
        </footer>
      </form>
    </section>
  );
};

const VehicleRentSearchSection = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(
    router?.query?.tab === "lift" ? 1 : 0
  );

  useEffect(() => {
    if (router?.query?.tab === "lift") {
      setActiveTab(1);
    } else {
      setActiveTab(0);
    }
  }, [router.query]);

  function handleTabChange(e, newTab = 0) {
    if (newTab === activeTab) return;
    setActiveTab(newTab);
  }

  return (
    <section className={styles.vehicle_rent_search_section}>
      <article className={styles.vehicle_rent_search_section__container}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          className={styles.vehicle_rent_search_section__tabs}
        >
          <Tab
            label="Location d'un camion de déménagement"
            fullWidth
            className={styles.halfWidthTab}
            sx={{
              backgroundColor: activeTab === 0 ? "#F1F9F5" : "inherit",
              fontWeight: "bold",
              minWidth: "50%",
            }}
          />
          <Tab
            label="Location d'un monte-meuble"
            fullWidth
            className={styles.halfWidthTab}
            sx={{
              backgroundColor: activeTab === 1 ? "#F1F9F5" : "inherit",
              fontWeight: "bold",
              minWidth: "50%",
            }}
          />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <VehicleRentSearchSectionVehicle />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <LiftRentSection />
        </TabPanel>
      </article>
    </section>
  );
};

export default VehicleRentSearchSection;
