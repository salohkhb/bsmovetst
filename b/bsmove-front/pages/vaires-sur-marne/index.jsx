import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import VairesSurMarne from "../../containers/Vaires-sur-Marne";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const VairesSurMarnePage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Vaires-sur-Marne - BS Move Déménagement'
      description="Vous recherchez un déménagement clé en main à Vaires-sur-Marne ? Découvrez nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Vaires-sur-Marne, Location de camion avec chauffeur Vaires-sur-Marne, Location de monte-meuble Vaires-sur-Marne, Achats de carton de déménagement Vaires-sur-Marne, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='vaires-sur-marne'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/vaires-sur-marne" />
        <meta property="og:url" content="https://www.bsmove.com/vaires-sur-marne"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <VairesSurMarne />
      <DynamicFooter />

    </Layout>
  )
}

export default VairesSurMarnePage