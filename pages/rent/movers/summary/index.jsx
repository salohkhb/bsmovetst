import { any } from "prop-types";
import Layout from "../../../../components/Layout";
import NavHeader from "../../../../components/NavHeader";
import Component from "../../../../containers/Rent/Movers/Summary";
import {
  handlePageRedirect,
  parseCookies,
} from "../../../../helpers/functions";
import Footer from "../../../../components/Footer";
import { NAV_HEADER_MOVERS_RENT_STEPS } from "../../../../helpers/constants";

const RentMoversSummary = ({ cookies }) => (
  <Layout
    cookies={cookies}
    title="Résumé de la location de déménageurs"
    description="Obtenez un aperçu complet des services de déménagement que vous avez sélectionnés."
    keywords="résumé des déménageurs, déménagement, déménageurs, services, résumé"
    pageId="movers-rent-summary"
    withoutHeader
  >
    <NavHeader secondary initialStep={1} steps={NAV_HEADER_MOVERS_RENT_STEPS} />
    <Component />
    <Footer />
  </Layout>
);

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, "common");
};

RentMoversSummary.propTypes = {
  cookies: any,
};

export default RentMoversSummary;
