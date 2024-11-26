import { useRouter } from "next/router";

import { useLoading } from "../../hooks/loading";
import { useAlert } from "../../hooks/alert";

import API from "../../helpers/api";
import Layout from "../../components/Layout";
import SigninContainer from "../../containers/SigninContainer";
import messages from "../../containers/Register/messages";
import Component from "../../containers/Register";
import { ALERT } from "../../helpers/constants";
import Routes from "../../helpers/routes";
import {
  handlePageRedirect,
  isObjectEmpty,
  parseCookies,
} from "../../helpers/functions";

const RegisterPage = ({ cookies }) => {
  const router = useRouter();
  const { setGlobalLoading } = useLoading();
  const { setAlert } = useAlert();

  async function handleSubmit({
    email,
    lastName,
    firstName,
    password,
    phoneNumber,
    gender,
    address,
    cgu,
  }) {
    if (
      !email ||
      !lastName ||
      !firstName ||
      !password ||
      !phoneNumber ||
      !gender ||
      isObjectEmpty(address) ||
      !cgu
    ) {
      return setAlert({
        severity: ALERT.ERROR,
        content: messages.alert.error.missingValues,
      });
    }
    setGlobalLoading(true);
    const response = await API.post("/Customers", {
      email,
      lastName,
      firstName,
      password,
      phoneNumber,
      civility: gender === "female" ? 1 : 0,
      address: {
        ...address,
        firstName,
        lastName,
      },
      birthdate: "2021-08-03T15:30:51.416Z",
    });
    setGlobalLoading(false);
    if (!response)
      return setAlert({
        severity: ALERT.ERROR,
        content: messages.alert.error.technicalError,
      });
    if (response.ok) {
      setAlert({ severity: ALERT.SUCCESS, content: messages.alert.success });
      return router.push(Routes.LOGIN_PAGE);
    } else if (!response.ok) {
      if (response.status === 422) {
        setAlert({
          severity: ALERT.ERROR,
          content: messages.alert.error.existingAccount,
        });
      } else {
        return setAlert({
          severity: ALERT.ERROR,
          content: messages.alert.error.technicalError,
        });
      }
    }
  }

  return (
    <Layout
      cookies={cookies}
      withoutHeader
      title="BS Move Déménagement - Inscription"
      description="Inscrivez-vous pour créer un compte et accéder à toutes les fonctionnalités de notre plateforme de déménagement."
      keywords="inscription, compte, utilisateur, déménagement, services"
      pageId="register"
      display="flex"
    >
      <SigninContainer page="register">
        <Component handleSubmit={handleSubmit} />
      </SigninContainer>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, "public");
};

export default RegisterPage;
