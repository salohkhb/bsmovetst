import { any } from "prop-types";
import Layout from "../../../../components/Layout";
import NavHeader from "../../../../components/NavHeader";
import Component from "../../../../containers/Rent/Lift/Selection";
import {
  handlePageRedirect,
  parseCookies,
} from "../../../../helpers/functions";
import Footer from "../../../../components/Footer";
import { NAV_HEADER_LIFT_RENT_STEPS } from "../../../../helpers/constants";

const LiftRentSelectionPage = ({ cookies }) => (
  <Layout
    cookies={cookies}
    title="Selection du monte-meuble"
    pageId="lift-rent-selection"
    withoutHeader
  >
    <NavHeader secondary initialStep={1} steps={NAV_HEADER_LIFT_RENT_STEPS} />
    <Component />
    <Footer />
  </Layout>
);

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, "common");
};

LiftRentSelectionPage.propTypes = {
  cookies: any,
};

export default LiftRentSelectionPage;
