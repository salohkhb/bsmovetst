import { useRent } from "../../../../hooks/rent";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { useCustomer } from "../../../../hooks/customer";
import { useFormik, Field, FormikProvider } from "formik";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { CguComponent } from "../../../Register";
import { formatDate, isObjectEmpty } from "../../../../helpers/functions";
import { useEffect, useState } from "react";
import validators, { isZipCodeValid } from "../../../../helpers/validators";
import { CURRENCY } from "../../../../helpers/constants";
import Routes from "../../../../helpers/routes";
import { useGlobal } from "../../../../hooks/global";
import { useLoading } from "../../../../hooks/loading";
import { useAlert } from "../../../../hooks/alert";
import api from "../../../../helpers/api";
import styles from "../../index.module.css";
import messages from "../messages";

function mapVehicleRentDataToAPI(data = {}) {
  return {
    startAddress: data.vehicle.startAddress,
    startDate: data.vehicle.startDate,
    duration: data.vehicle.duration,
    vehicle: {
      present: true,
      endAddress: data.vehicle.endAddress,
      km: data.vehicle.km,
      items: data.vehicle.items,
      floors: data.vehicle.floors,
    },
    lift: {
      present: false,
      floors: 0,
      items: [],
      km: 0,
      isEntrancePresent: false,
      entranceNotTallEnough: false,
    },
    movers: {
      present: (data.movers.nbMovingMen || 0) + data.vehicle.totalQuantity > 0, // should have minimum 1 mover with 1 truck
      onlyMovers: false,
      nbMovingMen: (data.movers.nbMovingMen || 0) + data.vehicle.totalQuantity, // at the minimum, nb movers = reduce(items.quantity)
    },
    customerInfos: {
      firstName: data.customerInfos?.firstName,
      lastName: data.customerInfos?.lastName,
      phoneNumber: data.customerInfos?.phoneNumber,
      email: data.customerInfos?.email,
      street: data.customerInfos?.street,
      zipCode: data.customerInfos?.zipCode,
      country: data.customerInfos?.country,
    },
    totalPrice: data.vehicle.totalPrice + data.movers.totalPrice,
    totalQuantity: data.vehicle.totalQuantity,
  };
}

const RentSummaryLeft = () => {
  const { auth, customer } = useCustomer();
  const { setGlobalLoading } = useLoading();
  const { addToGlobalStateByKey } = useGlobal();
  const { rent = {}, clearRent } = useRent();
  const { setAlert } = useAlert();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    lastName: customer?.lastName || "",
    firstName: customer?.firstName || "",
    street: customer?.address?.street || "",
    city: customer?.address?.city || "",
    zipCode: customer?.address?.zipCode || "",
    country: customer?.address?.country || "",
    email: customer?.email || "",
    confirmEmail: customer?.email || "",
    phoneNumber: customer?.phoneNumber || "",
    cgu: false,
  });
  useEffect(() => {
    setInitialValues((prevValues) => ({
      ...prevValues,
      lastName: customer?.lastName || "",
      firstName: customer?.firstName || "",
      street: customer?.address?.street || "",
      city: customer?.address?.city || "",
      zipCode: customer?.address?.zipCode || "",
      country: customer?.address?.country || "",
      email: customer?.email || "",
      confirmEmail: customer?.email || "",
      phoneNumber: customer?.phoneNumber || "",
      cgu: false,
    }));
  }, [customer]);

  function validate(values) {
    const errors = {};
    if (!values.lastName) errors.lastName = "Merci d'ajouter un nom";
    else if (!validators.isLastNameValid(values.lastName))
      errors.lastName = "Nom invalide";
    if (!values.firstName) errors.firstName = "Merci d'ajouter un prénom";
    else if (!validators.isFirstNameValid(values.firstName))
      errors.firstName = "Prénom invalide";
    if (!values.street) errors.street = "Merci d'ajouter une rue";
    if (!values.city) errors.city = "Merci d'ajouter une ville";
    if (!values.zipCode) errors.zipCode = "Merci d'ajouter un code postal";
    else if (!isZipCodeValid(values.zipCode))
      errors.zipCode = "Code postal invalide";
    if (!values.country) errors.country = "Merci d'ajouter un pays";
    if (!values.email) errors.email = "Merci d'ajouter un email";
    else if (!validators.isEmailValid(values.email))
      errors.email = "Merci d'ajouter un email valide";
    if (!values.confirmEmail) errors.confirmEmail = "Champs requis";
    else if (values.email !== values.confirmEmail)
      errors.confirmEmail = "Les emails ne correspondent pas";
    if (!values.cgu) errors.cgu = "Veuillez accepter les CGU";
    return errors;
  }

  async function handleSubmit(values) {
    setGlobalLoading(true);
    const requestData = mapVehicleRentDataToAPI({
      ...rent,
      customerInfos: values,
    });
    const res = await api.post("/Rentals", requestData, {
      headers: { Authorization: auth.id },
    });
    setGlobalLoading(false);
    if (res?.ok && !res.errors) {
      router.replace({
        pathname: Routes.VEHICLE_RENT_VALIDATION,
        query: { name: "vehicle" },
      });
      clearRent();
    } else {
      setAlert({
        severity: "error",
        content: "Une erreur est survenue lors de l'envoie du devis.",
      });
    }
  }
  const formik = useFormik({
    initialValues,
    validate,
    enableReinitialize: true,
    onSubmit: (values) => handleSubmit(values),
  });

  function redirectToLogin() {
    addToGlobalStateByKey("redirect", Routes.VEHICLE_RENT_PAGE_SUMMARY);
    router.push(Routes.LOGIN_PAGE);
  }
  return (
    <FormikProvider value={formik}>
      <article
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {!auth?.id ? (
          <div className={styles.rent_summary__left_container}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "60%",
              }}
            >
              <h4>Déjà client?</h4>
              <span style={{ color: "#8b9197" }}>
                Connectez-vous et gagnez du temps
              </span>
              <Button onClick={redirectToLogin}>Se connecter</Button>
            </div>
          </div>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.rent_summary__left_container}>
            <h1>Informations personnelles</h1>
            <Input
              label={"Nom"}
              placeholder={"Ex: Dupont"}
              error={
                formik.touched.lastName &&
                (formik?.errors?.lastName || !!formik?.status?.errors?.lastName)
              }
              name={"lastName"}
              values={formik.values.lastName}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type="text"
            />
            <Input
              label={"Prénom"}
              placeholder={"Ex: Jean"}
              error={
                formik.touched.firstName &&
                (formik?.errors?.firstName ||
                  !!formik?.status?.errors?.firstName)
              }
              name={"firstName"}
              values={formik.values.firstName}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type="text"
            />
            <Input
              label={"Addresse"}
              placeholder={"Ex: 10 rue des champs élysées"}
              error={
                formik.touched.street &&
                (formik?.errors?.street || !!formik?.status?.errors?.street)
              }
              name={"street"}
              values={formik.values.street}
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type="text"
            />
            <Input
              label={"Ville"}
              placeholder={"Ex: Paris"}
              error={
                formik.touched.city &&
                (formik?.errors?.city || !!formik?.status?.errors?.city)
              }
              name={"city"}
              values={formik.values.city}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type="text"
            />
            <Input
              label={"Code postal"}
              placeholder={"Ex: 75008"}
              error={
                formik.touched.zipCode &&
                (formik?.errors?.zipCode || !!formik?.status?.errors?.zipCode)
              }
              name={"zipCode"}
              values={formik.values.zipCode}
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type="text"
            />
            <Input
              label={"Pays"}
              placeholder={"Ex: France"}
              error={
                formik.touched.country &&
                (formik?.errors?.country || !!formik?.status?.errors?.country)
              }
              name={"country"}
              values={formik.values.country}
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type="text"
            />
            <Input
              label={"Adresse email"}
              placeholder={"Ex: jean.dupont@gmail.com"}
              error={
                formik.touched.email &&
                (formik?.errors?.email || !!formik?.status?.errors?.email)
              }
              name={"email"}
              values={formik.values.email}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type="email"
            />
            <Input
              label={"Confirmez l'email"}
              placeholder={"Ex: jean.dupont@gmail.com"}
              error={
                formik.touched.confirmEmail &&
                (formik?.errors?.confirmEmail ||
                  !!formik?.status?.errors?.confirmEmail)
              }
              name={"confirmEmail"}
              values={formik.values.confirmEmail}
              value={formik.values.confirmEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type="email"
            />
            <Input
              label={"Téléphone"}
              placeholder={"Ex: 0712345678"}
              error={
                formik.touched.phoneNumber &&
                (formik?.errors?.phoneNumber ||
                  !!formik?.status?.errors?.phoneNumber)
              }
              name={"phoneNumber"}
              values={formik.values.phoneNumber}
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              type="tel"
            />
          </div>
          <div className={styles.rent_summary__action_container}>
            <div>
              <Field
                name="cgu"
                checked={formik.values.cgu}
                component={(props) => (
                  <CguComponent
                    {...props}
                    error={formik.touched.cgu && formik.errors.cgu}
                  />
                )}
              />
            </div>
            <Button
              disabled={
                !isObjectEmpty(formik.errors) || isObjectEmpty(formik.values)
              }
              type="submit"
            >
              Valider et réserver
            </Button>
          </div>
        </form>
      </article>
    </FormikProvider>
  );
};

const RentSummaryRight = () => {
  const { rent } = useRent();
  const router = useRouter();
  return (
    <article className={styles.rent_summary__right_container_wrapper}>
      <div className={styles.rent_summary__right_container}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0 }}>Details</h2>
          <span
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => router.back()}
          >
            Modifier
          </span>
        </div>
        <div style={{ position: "relative", width: "120px", height: "120px" }}>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: "0",
            }}
          >
            <Image
              layout="fill"
              src={rent?.vehicle?.items[0]?.src || "/images/logo.png"}
              alt={rent?.vehicle?.vehicle?.name || "Camion"}
              class={styles.vehicle_illustration}
            />
          </div>
        </div>

        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "1em",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold" }}>Adresse de départ</span>
            <span style={{ color: "#8B9197" }}>
              {rent?.vehicle?.startAddress?.placeName}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold" }}>Adresse d&apos;arrivée</span>
            <span style={{ color: "#8B9197" }}>
              {rent?.vehicle?.endAddress?.placeName}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: "bold" }}>Date</span>
          <span style={{ color: "#8B9197" }}>
            {formatDate(rent?.vehicle?.startDate)}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: "bold" }}>Kilométrage</span>
          <span style={{ color: "#8B9197" }}>
            {rent?.vehicle?.km?.toFixed(2) || "-- "}km
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: "bold" }}>
            Nombre de déménageurs (chauffeurs + déménageurs supplémentaires)
          </span>
          <span style={{ color: "#8B9197" }}>
            {parseInt(
              (rent?.movers?.nbMovingMen || 0) +
                (rent?.vehicle?.totalQuantity || 0)
            )}
          </span>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Total :</h2>
          <span>
            {(rent?.vehicle?.totalPrice || 0) + (rent?.movers?.price || 0)}
            {CURRENCY.EUR}
          </span>
        </div>
      </div>
      <div className={styles.rent_summary__included_block}>
        <h2 style={{ margin: 0 }}>{messages.summary.included.title}</h2>
        <p style={{ color: "#8B9197" }}>{messages.summary.included.content}</p>
      </div>
    </article>
  );
};

const RentSummary = () => (
  <section className={styles.rent_summary__container}>
    <RentSummaryLeft />
    <RentSummaryRight />
  </section>
);

export default RentSummary;
