import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import Noisiel from "../../containers/Noisiel";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const NoisielPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Noisiel - BS Move Déménagement'
      description="Vous recherchez un déménagement clé en main à Noisiel ? Découvrez nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Noisiel, Location de camion avec chauffeur Noisiel, Location de monte-meuble Noisiel, Achats de carton de déménagement Noisiel, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='noisiel'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/noisiel" />
        <meta property="og:url" content="https://www.bsmove.com/noisiel"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <Noisiel />
      <DynamicFooter />

    </Layout>
  )
}

export default NoisielPage