import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Component from '../../containers/VolumeCalculator';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';
import {any} from "prop-types";

const VolumeCalculatorPage = ({ cookies }) => (
  <Layout cookies={cookies} title='Calculateur de volume' pageId='volume-calculator'>
    <NavHeader />
    <Component />
    <Footer />
  </Layout>
)

VolumeCalculatorPage.propTypes = {
    cookies: any,
}

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'common');
}

export default VolumeCalculatorPage;
