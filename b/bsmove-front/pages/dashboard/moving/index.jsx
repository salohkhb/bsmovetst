

import Layout from '../../../components/Layout';
import DashboardLayout from '../../../containers/Dashboard/Layout';
import Component from '../../../containers/Dashboard/Containers/Moving';
import { handlePageRedirect, parseCookies } from '../../../helpers/functions';

const DashboardMovingPage = ({ cookies }) => (
  <Component />
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'admin');
}

DashboardMovingPage.getLayout = function getLayout(page) {
  return (
    <Layout cookies={page?.props?.cookies} title='Tableau de bord - Déménagement' description="Consultez les détails de votre déménagement, y compris la date, l'heure et les services sélectionnés." keywords='détails du déménagement, déménagement, détails, tableau de bord' pageId='dashboard-moving' withoutHeader>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  )
}

export default DashboardMovingPage;
