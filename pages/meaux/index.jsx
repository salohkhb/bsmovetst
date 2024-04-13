import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Meaux from "../../containers/Meaux";
import Head from 'next/head';

const MeauxPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Meaux - BS Move Déménagement'
      description="À la recherche d'un déménagement clé en main à Meaux? Profitez de nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Meaux, Location de camion avec chauffeur Meaux, Location de monte-meuble Meaux, Achats de carton de déménagement Meaux, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='meaux'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/meaux" />
      </Head>
      <NavHeader />
      <Meaux />
      <Footer />
    </Layout>
  )
}

export default MeauxPage