import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import ChampsSurMarne from "../../containers/Champs-sur-Marne";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('./../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const ChampsSurMarnePage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Champs-sur-Marne - BS Move'
      description="Vous prévoyez de déménager facilement à Champs-sur-Marne ? Découvrez nos solutions abordables et performantes pour un service de déménagement complet."
      keywords='Déménagement Champs-sur-Marne,Champs-sur-Marne, Location de camion avec chauffeur Champs-sur-Marne, Location de monte-meuble Champs-sur-Marne, Achats de carton de déménagement Champs-sur-Marne, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='villeparisis'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/champs-sur-marne" />
        <meta property="og:url" content="https://www.bsmove.com/champs-sur-marne"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <ChampsSurMarne />
      <DynamicFooter />

    </Layout>
  )
}

export default ChampsSurMarnePage