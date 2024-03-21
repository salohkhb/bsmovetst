

import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Component from '../../containers/FurnituresBuy';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const FurnituresBuyPage = ({ cookies }) => (
  <Layout cookies={cookies} title='BS Move - Achat de fournitures'
    description="Découvrez notre large gamme de meubles et mobilier adaptés à vos besoins de déménagement chez BS Move. Que vous recherchiez des fournitures spécifiques ou que vous souhaitiez renouveler votre mobilier, notre sélection couvre tous vos besoins d'achat. Profitez de produits de qualité pour équiper votre espace selon vos envies."
    keywords='Achat de fournitures, furnitures buy, achat, buy, achats de meubles, déménagement, meubles, achats, mobilier, produits'
    pageId='furnitures-buy'>
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
