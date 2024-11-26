import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import Montereau from "../../containers/Montereau-Fault-Yonne";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('./../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const MontereauPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Montereau-Fault-Yonne - BS Move Déménagement'
      description="À la recherche d'un déménagement clé en main à Montereau-Fault-Yonne? Profitez de nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Montereau-Fault-Yonne, Location de camion avec chauffeur Montereau-Fault-Yonne, Location de monte-meuble Montereau-Fault-Yonne, Achats de carton de déménagement Montereau-Fault-Yonne, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='montereau-fault-yonne'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/montereau-fault-yonne" />
        <meta property="og:url" content="https://www.bsmove.com/montereau-fault-yonne"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <Montereau />
      <DynamicFooter />

    </Layout>
  )
}

export default MontereauPage