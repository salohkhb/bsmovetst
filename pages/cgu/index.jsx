import Component from "../../containers/Cgu";
import Layout from "../../components/Layout";
import { handlePageRedirect, parseCookies } from "../../helpers/functions";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";

const CguPage = ({ cookies }) => (
  <Layout
    cookies={cookies}
    title="BS Move - Conditions générales d'utilisation"
    description="Consultez les conditions générales d'utilisation de BS Move pour obtenir des informations sur nos services, nos engagements, et nos termes de contrat. Découvrez les informations nécessaires pour utiliser nos services de déménagement, de location de véhicules, et de transport en toute sécurité et conformité avec nos règles d'utilisation."
    keywords="conditions générales d'utilisation, cgu, termes, contrat, déménagement, services, informations, Besoin d'aide, règles d'utilisation"
    pageId="cgu"
  >
    <NavHeader />
    <Component />
    <Footer />
  </Layout>
);

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, "common");
};

export default CguPage;
