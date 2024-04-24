import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import DammarieLèsLys from "../../containers/Dammarie-lès-Lys";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const DammarieLèsLysPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Dammarie-lès-Lys - BS Move'
      description="Envisagez-vous un déménagement en toute simplicité àDammarie-lès-Lys ? Explorez nos solutions abordables et efficaces pour un service complet de déménagement."
      keywords='Déménagement Dammarie-lès-Lys, Dammarie-lès-Lys, Location de camion avec chauffeur Dammarie-lès-Lys, Location de monte-meuble Dammarie-lès-Lys, Achats de carton de déménagement Dammarie-lès-Lys, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='dammarie-les-lys'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/dammarie-les-lys" />
        <meta property="og:url" content="https://www.bsmove.com/dammarie-les-lys"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
      </Head>
      <NavHeader />
      <DammarieLèsLys />
      <DynamicFooter />

    </Layout>
  )
}

export default DammarieLèsLysPage