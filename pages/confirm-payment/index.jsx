import Layout from "../../components/Layout";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";
import Component from "../../containers/ConfirmPayment";
import {
  handlePageRedirect,
  parseCookies,
} from "../../helpers/functions";
import { NAV_HEADER_FURNITURES_BUY_STEPS } from "../../helpers/constants";

const ConfirmPaymentPage = ({ cookies }) => (
  <Layout
    cookies={cookies}
    title="BS Move - Confirmation du paiement"
    description="Confirmez le paiement de votre réservation pour finaliser votre commande avec succès."
    keywords="Confirmation, Paiement, Confirmation Paiement, réservation, commande, succès, déménagement, services"
    pageId="confirm-payment"
    withoutHeader
  >
    <NavHeader
      secondary
      initialStep={3}
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

export default ConfirmPaymentPage;
