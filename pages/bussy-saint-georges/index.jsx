import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import BussySaintGeorges from "../../containers/Bussy-Saint-Georges";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('./../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const BussySaintGeorgesPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Bussy-Saint-Georges - BS Move'
      description="Vous envisagez un déménagement facile à Bussy-Saint-Georges ? Explorez nos solutions économiques et efficaces pour un service de déménagement complet."
      keywords='Déménagement Bussy-Saint-Georges,Bussy-Saint-Georges, Location de camion avec chauffeur Bussy-Saint-Georges, Location de monte-meuble Bussy-Saint-Georges, Achats de carton de déménagement Bussy-Saint-Georges, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='villeparisis'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/bussy-saint-georges" />
        <meta property="og:url" content="https://www.bsmove.com/bussy-saint-georges"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <BussySaintGeorges />
      <DynamicFooter />

    </Layout>
  )
}

export default BussySaintGeorgesPage