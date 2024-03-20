

import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Component from '../../containers/Delivery';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';
import { NAV_HEADER_FURNITURES_BUY_STEPS } from '../../helpers/constants';

const DeliveryPage = ({ cookies, ...rest }) => (
  <Layout cookies={cookies} title='BS Move - Livraison' description='Planifiez la livraison de vos biens déménagés à votre nouvelle adresse en toute simplicité.' keywords='livraison, déménagement, service, transport, meubles' pageId='delivery' withoutHeader>
    <NavHeader secondary initialStep={1} steps={NAV_HEADER_FURNITURES_BUY_STEPS} />
    <Component />
    <Footer />
  </Layout>
);

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'private', '', parsedCookies?.order?.items?.length);
}

export default DeliveryPage;
