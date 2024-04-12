

import Layout from '../components/Layout';
import NavHeader from '../components/NavHeader';
import Footer from '../components/Footer';
import Component from '../containers/Home';
import { handlePageRedirect, parseCookies } from '../helpers/functions';
import Head from 'next/head';


export default function Home({ cookies = {} }) {
  return (
    <Layout cookies={cookies} title='BS Move Déménagement - Accueil' keywords='déménagement résidentiel, déménagement commercial, cartons de déménagement, éménagement clé en main, transport de meubles, fournitures de déménagement, devis déménagement, éménagement sur mesure, entreprise de déménagement, BS Move, Déménagement, Déménageur, Déménageur professionnel, déménagement, services, transport, logistique, location, véhicules, meubles, emballage, déménageurs, entreprise, devis, estimation, emménagement, emballage, fournitures, cartons, matériel, déménager, déménageur, déménageurs, déménageuse, déménagements, relocation, logistique, camion, utilitaire, déménager pas cher, déménager seul, déménager avec des professionnels, déménager avec des amis, déménager avec des déménageurs, déménager avec des déménageuses, déménager avec des professionnels' description='Offrez-vous des services professionnels pour faciliter votre déménagement à la hauteur de vos attentes.' pageId='home'>
      <NavHeader />
      <Component />
      <Footer />
    </Layout>
  )
}

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'common');
}
