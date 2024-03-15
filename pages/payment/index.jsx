import Layout from "../../components/Layout";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import Component from "../../containers/Payment";
import {
  handlePageRedirect,
  isObjectEmpty,
  parseCookies,
} from "../../helpers/functions";
import { NAV_HEADER_FURNITURES_BUY_STEPS } from "../../helpers/constants";

const PaymentPage = ({ cookies }) => (
  <Layout cookies={cookies} title="BS Move - Paiement" description="Effectuez un paiement sécurisé pour confirmer votre réservation de services de déménagement ou de location de véhicule." keywords="paiement, facturation, transactions, déménagement, services" pageId="payment" withoutHeader>
    <NavHeader
      secondary
      initialStep={2}
      steps={NAV_HEADER_FURNITURES_BUY_STEPS}
    />
    <Component />
    <Footer />
  </Layout>
);

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(
    parsedCookies,
    "private",
    "",
    parsedCookies?.order?.items?.length
  );
};

export default PaymentPage;
