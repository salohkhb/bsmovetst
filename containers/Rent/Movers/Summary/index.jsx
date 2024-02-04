import { useRent } from "../../../../hooks/rent";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { useCustomer } from "../../../../hooks/customer";
import { useFormik, Field, FormikProvider } from "formik";
import { useRouter } from "next/router";
import { CguComponent } from "../../../../containers/Register";
import { formatDate, isObjectEmpty } from "../../../../helpers/functions";
import { useEffect, useState } from "react";
import validators, { isZipCodeValid } from "../../../../helpers/validators";
import Routes from "../../../../helpers/routes";
import api from "../../../../helpers/api";
import { useLoading } from "../../../../hooks/loading";
import { useAlert } from "../../../../hooks/alert";
import Divider from "@mui/material/Divider";
import { getMoversPrice } from "../../../../helpers/prices";
import { CURRENCY } from "../../../../helpers/constants";

function mapMoversRentDataToAPI(data = {}) {
  return {
    startAddress: data.movers.startAddress,
    startDate: data.movers.startDate,
    duration: data.movers.duration,
    vehicle: {
      present: false,
      endAddress: null,
      km: 0,
      items: [],
    },
    lift: {
      present: true,
      floors: 0,
      items: [],
      km: 0,
      isEntrancePresent: false,
      entranceNotTallEnough: false,
    },
    movers: {
      present: data?.movers?.nbMovingMen > 0,
      onlyMovers: true,
      nbMovingMen: data?.movers?.nbMovingMen,
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
    totalQuantity: data.movers.nbMovingMen,
    totalPrice: data.movers.totalPrice,
  };
}
const RentSummaryLeft = () => {
  const { auth, customer } = useCustomer();
  const { setGlobalLoading } = useLoading();
  const { setAlert } = useAlert();
  const { rent = {}, clearRent, handleMoversRent } = useRent();
  const router = useRouter();

  useEffect(() => {
    handleMoversRent({
      ...rent.movers,
      totalPrice: getMoversPrice(
        rent.movers?.nbMovingMen,
        rent.movers?.duration
      ),
    });
  }, [rent?.movers?.nbMovingMen]);

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
    const requestData = mapMoversRentDataToAPI({ ...rent, ...values });
    const res = await api.post("/Rentals", requestData, {
      headers: { Authorization: auth.id },
    });
    setGlobalLoading(false);
    if (res?.ok && !res.errors) {
      router.replace({
        pathname: Routes.MOVERS_RENT_VALIDATION,
        query: { name: "movers" },
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

  return (
    <FormikProvider value={formik}>
      <article style={{ display: "flex", flexDirection: "column" }}>
        <form onSubmit={formik.handleSubmit}>
          <div
            style={{
              display: "flex",
              width: "500px",
              flexDirection: "column",
              border: "1px solid #DEDEDE",
              borderRadius: "12px",
              gap: "2em",
              padding: "30px",
            }}
          >
            <h3>Informations personnelles</h3>
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
          <div>
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
    <article
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      <div
        style={{
          display: "flex",
          width: "470px",
          flexDirection: "column",
          border: "1px solid #DEDEDE",
          borderRadius: "12px",
          gap: "1em",
          padding: "30px",
        }}
      >
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
              {rent?.movers?.startAddress?.placeName}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold" }}>Dureée de la manutention</span>
            <span style={{ color: "#8B9197" }}>
              {rent?.movers?.duration} heures
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: "bold" }}>Date</span>
          <span style={{ color: "#8B9197" }}>
            {formatDate(rent?.movers?.startDate)}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: "bold" }}>Nombre de déménageurs</span>
          <span style={{ color: "#8B9197" }}>
            {parseInt(rent?.movers?.nbMovingMen)}
          </span>
        </div>
        <Divider />
        <div style={{ display: "flex", flexDirection: "row", gap: "0.5em" }}>
          <span style={{ fontWeight: "bold" }}>Total: </span>
          <span style={{ color: "#8B9197" }}>
            {rent.movers?.totalPrice}
            {CURRENCY.EUR}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderRadius: "12px",
          flexDirection: "column",
          padding: "41px 30px",
          gap: "1em",
          marginTop: "2em",
          backgroundColor: "#F1F9F5",
        }}
      >
        <h2 style={{ margin: 0 }}>Inclus</h2>
        <p style={{ color: "#8B9197" }}>
          Les sangles et les chariots, disponibles sur demande. Bénéficiez de
          l’expertise et de l’expérience de nos déménageurs pour un transport
          sécurisé et une manipulation professionnelle de vos biens.”
        </p>
      </div>
    </article>
  );
};

const RentSummary = () => (
  <section
    style={{
      display: "flex",
      flexDirection: "row",
      padding: "56px 15%",
      gap: "114px",
    }}
  >
    <RentSummaryLeft />
    <RentSummaryRight />
  </section>
);

export default RentSummary;
