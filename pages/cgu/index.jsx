import Component from "../../containers/Cgu";
import Layout from "../../components/Layout";
import { handlePageRedirect, parseCookies } from "../../helpers/functions";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";

const CguPage = ({ cookies }) => (
  <Layout
    cookies={cookies}
    title="BS Move - Conditions générales d'utilisation pour nos services de déménagement"
    description="Consultez nos conditions générales d'utilisation pour comprendre les règles et conditions d'utilisation de notre plateforme."
    keywords="conditions générales d'utilisation, CGU, termes, contrat, déménagement, services, informations, Besoin d'aide, Demande de renseignements, assistance, devis, estimation, Renseignements, Questions, Assistance, déménageur, déménageurs, déménageuse, déménagements, relocation, logistique, camion, utilitaire, déménager pas cher, déménager seul, déménager avec des professionnels, déménager avec des amis, déménager avec des déménageurs, déménager avec des déménageuses, déménager avec des professionnels"
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
