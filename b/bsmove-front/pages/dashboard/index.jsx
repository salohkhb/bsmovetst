

import Layout from '../../components/Layout';
import DashboardLayout from '../../containers/Dashboard/Layout';
import Component from '../../containers/Dashboard';
import { handlePageRedirect, parseCookies } from '../../helpers/functions';

const DashboardPage = ({ cookies }) => (
  <Component />
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);

  // TODO : fetch is ADMIN
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'admin');
}

DashboardPage.getLayout = function getLayout(page) {
  return (
    <Layout cookies={page?.props?.cookies} title='Tableau de bord - Accueil' description="Accédez à votre tableau de bord pour gérer votre compte, suivre vos déménagements et effectuer des achats."
    keywords='tableau de bord, compte, utilisateur, déménagement, services'
    pageId='dashboard' withoutHeader>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  )
}

export default DashboardPage;
