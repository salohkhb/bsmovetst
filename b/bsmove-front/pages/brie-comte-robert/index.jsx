import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import BrieComteRobert from "../../containers/Brie-Comte-Robert";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const BrieComteRobertPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Brie-Comte-Robert - BS Move Déménagement'
      description="Vous recherchez un déménagement clé en main à Brie-Comte-Robert ? Découvrez nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Brie-Comte-Robert, Location de camion avec chauffeur Brie-Comte-Robert, Location de monte-meuble Brie-Comte-Robert, Achats de carton de déménagement Brie-Comte-Robert, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='brie-comte-robert'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/brie-comte-robert" />
        <meta property="og:url" content="https://www.bsmove.com/brie-comte-robert"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <BrieComteRobert />
      <DynamicFooter />

    </Layout>
  )
}

export default BrieComteRobertPage