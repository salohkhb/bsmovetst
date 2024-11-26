import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import MoretLoingEtOrvanne from "../../containers/Moret-Loing-et-Orvanne";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const MoretLoingEtOrvannePage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Moret-Loing-et-Orvanne - BS Move Déménagement'
      description="Vous recherchez un déménagement clé en main à Moret-Loing-et-Orvanne ? Découvrez nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Moret-Loing-et-Orvanne, Location de camion avec chauffeur Moret-Loing-et-Orvanne, Location de monte-meuble Moret-Loing-et-Orvanne, Achats de carton de déménagement Moret-Loing-et-Orvanne, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='moret-loing-et-orvanne'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/moret-loing-et-orvanne" />
        <meta property="og:url" content="https://www.bsmove.com/moret-loing-et-orvanne"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <MoretLoingEtOrvanne />
      <DynamicFooter />

    </Layout>
  )
}

export default MoretLoingEtOrvannePage