import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
// import Footer from '../../components/Footer';
import PontaultCombault from "../../containers/Pontault-Combault";
import Head from 'next/head';
import dynamic from 'next/dynamic'

const DynamicFooter = dynamic(() => import('./../../components/Footer'), {
  loading: () => <p>Loading...</p>,
})
const PontaultCombaultPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Pontault-Combault - BS Move'
      description="Besoin d'un déménagement sans tracas à Pontault-Combault? Découvrez nos solutions pratiques et économiques pour un déménagement clé en main."
      keywords='Déménagement Pontault-Combault, Pontault-Combault, Location de camion avec chauffeur Pontault-Combault, Location de monte-meuble Pontault-Combault, Achats de carton de déménagement Pontault-Combault, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='pontault-combault'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/pontault-combault" />
        <meta property="og:url" content="https://www.bsmove.com/pontault-combault"/>
        <meta property="og:image" content="https://www.bsmove.com/images/logo.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:image:alt" content="BS Move Déménagement"/>
        <meta property="og:site_name" content="BS Move Déménagement"/>
        <meta property="og:locale" content="fr_FR"/>
        <meta property="og:locale:alternate" content="en_US"/>
        {/* Schema.org structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
          {
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "Déménagement Pontault Combault - BS Move",
            "url": "${process.env.NEXT_PUBLIC_WEBSITE_URL}",
            "logo": "${process.env.NEXT_PUBLIC_WEBSITE_URL}/images/logo.png",
          }
        ` }} />
      </Head>
      <NavHeader />
      <PontaultCombault />
      <DynamicFooter />

    </Layout>
  )
}

export default PontaultCombaultPage