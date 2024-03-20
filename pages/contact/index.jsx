

import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Component from '../../containers/Contact';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const ContactPage = ({ cookies }) => (
  <Layout cookies={cookies} title='BS Move Déménagement - Nous contacter'
    description="Prenez contact avec notre équipe pour toute question ou demande d'information sur nos services."
    keywords="contact, contactez-nous, Nous contacter, déménagement, services, informations, Besoin d'aide, Demande de renseignements, assistance, devis, estimation, Renseignements, Questions, Assistance"
    pageId='contact'>
    <NavHeader />
    <Component />
    <Footer />
  </Layout>
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'common');
}

export default ContactPage;
