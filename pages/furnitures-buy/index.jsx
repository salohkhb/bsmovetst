

import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Component from '../../containers/FurnituresBuy';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const FurnituresBuyPage = ({ cookies }) => (
  <Layout cookies={cookies} title='BS Move - Achat de fournitures' description="Parcourez notre sélection de meubles à vendre pour équiper votre nouvel espace de vie." keywords='achats de meubles, déménagement, meubles, achats, mobilier, produits' pageId='furnitures-buy'>
    <NavHeader />
    <Component />
    <Footer />
  </Layout>
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'common');
}

export default FurnituresBuyPage;
