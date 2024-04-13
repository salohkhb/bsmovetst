import Layout from "../../components/Layout";
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Chelles from "../../containers/Chelles";
import Head from 'next/head';

const MeauxPage = ({ cookies }) => {
  return (
    <Layout cookies={cookies}
      title='Déménagement Chelles - BS Move Déménagement'
      description="À la recherche d'un service de déménagement complet à Chelles? Découvrez nos offres pratiques et économiques pour un déménagement facile et sans tracas."
      keywords='Déménagement Chelles, Location de camion avec chauffeur Chelles, Location de monte-meuble Chelles, Achats de carton de déménagement Chelles, Carton pas cher, Déménagement gendarme, Déménagement clés en main, BS Move déménagement'
      pageId='blog'
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/chelles" />
        <meta property="og:url" content="https://www.bsmove.com/chelles"/>
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
            "name": "Déménagement Chelles - BS Move Déménagement",
            "url": "${process.env.NEXT_PUBLIC_WEBSITE_URL}",
            "logo": "${process.env.NEXT_PUBLIC_WEBSITE_URL}/images/logo.png",
          }
        ` }} />
      </Head>
      <NavHeader />
      <Chelles />
      <Footer />
    </Layout>
  )
}

export default MeauxPage