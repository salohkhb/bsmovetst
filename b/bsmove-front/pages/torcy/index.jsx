import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import Torcy from "../../containers/Torcy";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('./../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const TorcyPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Torcy - BS Move Déménagement'
      description="Vous souhaitez déménager en toute tranquillité à Torcy ? Explorez nos solutions pratiques et accessibles pour un déménagement clé en main."
      keywords='Déménagement Torcy,Torcy, Location de camion avec chauffeur Torcy, Location de monte-meuble Torcy, Achats de carton de déménagement Torcy, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='torcy'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/torcy" />
        <meta property="og:url" content="https://www.bsmove.com/torcy"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <Torcy />
      <DynamicFooter />

    </Layout>
  )
}

export default TorcyPage