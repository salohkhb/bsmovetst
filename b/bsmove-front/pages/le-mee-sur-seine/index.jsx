import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import LeMeeSurSeine from "../../containers/Le-Mee-sur-Seine";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const LeMeeSurSeinePage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Le Mée-sur-Seine - BS Move Déménagement'
      description="À la recherche d'un déménagement clé en main à Le Mée-sur-Seine? Profitez de nos solutions pratiques et économiques pour un déménagement sans souci."
      keywords='Déménagement Le Mée-sur-Seine, Location de camion avec chauffeur Le Mée-sur-Seine, Location de monte-meuble Le Mée-sur-Seine, Achats de carton de déménagement Le Mée-sur-Seine, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='le-mee-sur-seine'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/le-mee-sur-seine" />
        <meta property="og:url" content="https://www.bsmove.com/le-mee-sur-seine"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <LeMeeSurSeine />
      <DynamicFooter />

    </Layout>
  )
}

export default LeMeeSurSeinePage