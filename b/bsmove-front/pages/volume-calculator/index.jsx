import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Component from '../../containers/VolumeCalculator';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';
import {any} from "prop-types";
import VolumeCalculatorFAQ from "../../containers/VolumeCalculator/components/VolumeCalculatorFAQ";

const VolumeCalculatorPage = ({ cookies }) => (
  <Layout cookies={cookies} title='BS Move - Calculateur de volume' description='Calculez rapidement le volume de vos biens à déménager pour mieux planifier votre déménagement.' keywords='calculateur de volume, volume, déménagement, estimation, outil' pageId='volume-calculator'>
    <NavHeader />
    <Component />
    <VolumeCalculatorFAQ />
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
