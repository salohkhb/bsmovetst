import { any } from "prop-types";
import Layout from "../../../../components/Layout";
import NavHeader from "../../../../components/NavHeader";
import Component from "../../../../containers/Rent/Movers/Validation";
import {
  handlePageRedirect,
  parseCookies,
} from "../../../../helpers/functions";
import Footer from "../../../../components/Footer";
import { NAV_HEADER_MOVERS_RENT_STEPS } from "../../../../helpers/constants";

const RentMoversValidation = ({ cookies }) => (
  <Layout
    cookies={cookies}
    title="Validation de la location de déménageurs"
    description="Validez les détails de votre location de déménageurs avant la finalisation de la commande."
    keywords="location de déménageurs, déménagement, location, services, validation, détails, finalisation, commande"
    pageId="movers-rent-validation"
    withoutHeader
  >
    <NavHeader secondary initialStep={2} steps={NAV_HEADER_MOVERS_RENT_STEPS} />
    <Component />
    <Footer />
  </Layout>
);

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, "common");
};

RentMoversValidation.propTypes = {
  cookies: any,
};

export default RentMoversValidation;
