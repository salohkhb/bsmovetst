import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import Melun from "../../containers/Melun";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('./../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const MelunPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Melun - BS Move Déménagement'
      description="À la recherche d'un déménagement clé en main à Melun? Profitez de nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Melun, Location de camion avec chauffeur Melun, Location de monte-meuble Melun, Achats de carton de déménagement Melun, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='melun'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/melun" />
        <meta property="og:url" content="https://www.bsmove.com/melun"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <Melun />
      <DynamicFooter />

    </Layout>
  )
}

export default MelunPage