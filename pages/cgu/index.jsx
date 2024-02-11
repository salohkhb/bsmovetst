import Component from "../../containers/Cgu";
import Layout from "../../components/Layout";
import { handlePageRedirect, parseCookies } from "../../helpers/functions";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";

const CguPage = ({ cookies }) => (
  <Layout
    cookies={cookies}
    title="Conditions générales d'utilisation"
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
