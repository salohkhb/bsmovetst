import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import VauxLePenil from "../../containers/Vaux-le-Penil";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const VauxLePenilPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Vaux-le-Pénil - BS Move Déménagement'
      description="Vous recherchez un déménagement clé en main à Vaux-le-Pénil ? Découvrez nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Vaux-le-Pénil, Location de camion avec chauffeur Vaux-le-Pénil, Location de monte-meuble Vaux-le-Pénil, Achats de carton de déménagement Vaux-le-Pénil, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='vaux-le-penil'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/vaux-le-penil" />
        <meta property="og:url" content="https://www.bsmove.com/vaux-le-penil"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <VauxLePenil />
      <DynamicFooter />

    </Layout>
  )
}

export default VauxLePenilPage