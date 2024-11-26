import Component from "../../containers/Cgu";
import Layout from "../../components/Layout";
import { handlePageRedirect, parseCookies } from "../../helpers/functions";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";

const CguPage = ({ cookies }) => (
  <Layout
    cookies={cookies}
    title="BS Move - Conditions générales de vente"
    description="Les présentes conditions générales de vente et les conditions particulières négociées entre l'entreprise et le client déterminent les droits et obligations de chacun d'eux. Elles s'appliquent de plein droit aux opérations de déménagement objet du présent contrat."
    keywords="conditions générales de vente, contrat, conditions, déménagement, services, informations, Besoin d'aide, règles de vente"
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
