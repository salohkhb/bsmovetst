import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import Meaux from "../../containers/Meaux";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('./../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
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
        <meta property="og:url" content="https://www.bsmove.com/meaux"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <Meaux />
      <DynamicFooter />

    </Layout>
  )
}

export default MeauxPage