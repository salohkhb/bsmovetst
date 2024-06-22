import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import SaintFargeauPonthierry from "../../containers/saint-fargeau-ponthierry";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const SaintFargeauPonthierryPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Saint-Fargeau-Ponthierry - BS Move Déménagement'
      description="Vous recherchez un déménagement clé en main à Saint-Fargeau-Ponthierry ? Découvrez nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Saint-Fargeau-Ponthierry, Location de camion avec chauffeur Saint-Fargeau-Ponthierry, Location de monte-meuble Saint-Fargeau-Ponthierry, Achats de carton de déménagement Saint-Fargeau-Ponthierry, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='saint-fargeau-ponthierry'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/saint-fargeau-ponthierry" />
        <meta property="og:url" content="https://www.bsmove.com/saint-fargeau-ponthierry"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <SaintFargeauPonthierry />
      <DynamicFooter />

    </Layout>
  )
}

export default SaintFargeauPonthierryPage