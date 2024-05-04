import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import LagnySurMarne from "../../containers/lagny-sur-marne";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const LagnySurMarnePage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Lagny-sur-Marne - BS Move Déménagement'
      description="À la recherche d'un déménagement clé en main à Lagny-sur-Marne? Profitez de nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Lagny-sur-Marne, Location de camion avec chauffeur Lagny-sur-Marne, Location de monte-meuble Lagny-sur-Marne, Achats de carton de déménagement Lagny-sur-Marne, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='melun'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/lagny-sur-marne" />
        <meta property="og:url" content="https://www.bsmove.com/lagny-sur-marne"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <LagnySurMarne />
      <DynamicFooter />

    </Layout>
  )
}

export default LagnySurMarnePage