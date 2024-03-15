

import Layout from '../components/Layout';
import NavHeader from '../components/NavHeader';
import Footer from '../components/Footer';
import Component from '../containers/Home';
import { handlePageRedirect, parseCookies } from '../helpers/functions';
import Head from 'next/head';


export default function Home({ cookies = {} }) {
  return (
    <Layout cookies={cookies} title='BS Move Déménagement' description='Offrez-vous un déménagement à la hauteur de vos attentes' pageId='home'>
      <Head>
        <meta name="keywords" content="BS Move, Déménagement, Déménageur, Déménageur professionnel" />
      </Head>
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
