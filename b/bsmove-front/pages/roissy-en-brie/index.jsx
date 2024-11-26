import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import RoissyEnBrie from "../../containers/Roissy-en-Brie";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('./../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const SavignyLeTemplePage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Roissy-en-Brie - BS Move'
      description="À la recherche d'un déménagement sans tracas à Savigny-le-Temple? Explorez nos solutions pratiques et économiques pour un déménagement clé en main."
      keywords='Déménagement Savigny-le-Temple,Savigny-le-Temple, Location de camion avec chauffeur Savigny-le-Temple, Location de monte-meuble Savigny-le-Temple, Achats de carton de déménagement Savigny-le-Temple, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='roissy-en-brie'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/savigny-le-temple" />
        <meta property="og:url" content="https://www.bsmove.com/pontault-combault"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <RoissyEnBrie />
      <DynamicFooter />

    </Layout>
  )
}

export default SavignyLeTemplePage