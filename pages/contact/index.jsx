

import Layout from '../../components/Layout';
import NavHeader from '../../components/NavHeader';
import Footer from '../../components/Footer';
import Component from '../../containers/Contact';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const ContactPage = ({ cookies }) => (
  <Layout cookies={cookies} title='BS Move Déménagement - Contactez-nous'
    description="Besoin d'aide pour votre déménagement ? Contactez BS Move dès aujourd'hui pour obtenir une estimation, poser vos questions, ou demander des renseignements. Notre équipe d'assistance est là pour vous offrir tous les services et informations nécessaires. Que ce soit pour un devis, une assistance, ou toute autre demande, nous sommes prêts à répondre à vos besoins."
    keywords="contacter, contact, contactez-nous, Nous contacter, déménagement, services, informations, Besoin d'aide, Demande de renseignements, assistance, devis, estimation, Renseignements, Questions, Assistance"
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
