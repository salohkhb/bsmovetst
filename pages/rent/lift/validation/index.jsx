import { any } from "prop-types";
import Layout from "../../../../components/Layout";
import NavHeader from "../../../../components/NavHeader";
import Component from "../../../../containers/Rent/Lift/Validation";
import {
  handlePageRedirect,
  parseCookies,
} from "../../../../helpers/functions";
import Footer from "../../../../components/Footer";
import { NAV_HEADER_LIFT_RENT_STEPS } from "../../../../helpers/constants";

const LiftRentValidationPage = ({ cookies }) => (
  <Layout
    cookies={cookies}
    title="Validation de la location du monte-meuble"
    description="Validez les détails de votre location de monte-meuble avant la finalisation de la commande."
    keywords="validation de la location de monte-meuble, déménagement, monte-meuble, location, services"
    pageId="lift-rent-validation"
    withoutHeader
  >
    <NavHeader secondary initialStep={3} steps={NAV_HEADER_LIFT_RENT_STEPS} />
    <Component />
    <Footer />
  </Layout>
);

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, "common");
};

LiftRentValidationPage.propTypes = {
  cookies: any,
};

export default LiftRentValidationPage;
