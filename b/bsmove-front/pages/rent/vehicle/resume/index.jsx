import { any } from "prop-types";
import Layout from "../../../../components/Layout";
import NavHeader from "../../../../components/NavHeader";
import Component from "../../../../containers/Rent/Vehicle/Summary";
import {
  handlePageRedirect,
  parseCookies,
} from "../../../../helpers/functions";
import Footer from "../../../../components/Footer";
import { NAV_HEADER_VEHICLE_RENT_STEPS } from "../../../../helpers/constants";

const RentSummary = ({ cookies }) => (
  <Layout
    cookies={cookies}
    title="Résumé de la location de camion"
    description="Consultez un résumé détaillé de votre location de camion avant la confirmation."
    keywords="Résumé, location, camion, déménagement, détails, services, confirmation"
    pageId="truck-rent-summary"
    withoutHeader
  >
    <NavHeader
      secondary
      initialStep={2}
      steps={NAV_HEADER_VEHICLE_RENT_STEPS}
    />
    <Component />
    <Footer />
  </Layout>
);

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, "common");
};

RentSummary.propTypes = {
  cookies: any,
};

export default RentSummary;
