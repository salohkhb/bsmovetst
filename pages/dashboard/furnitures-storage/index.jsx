

import Layout from '../../../components/Layout';
import DashboardLayout from '../../../containers/Dashboard/Layout';
import Component from '../../../containers/Dashboard/Containers/FurnituresStorage';
import { handlePageRedirect, parseCookies } from '../../../helpers/functions';

const DashboardFurnituresStoragePage = ({ cookies }) => (
  <Component />
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'admin');
}

DashboardFurnituresStoragePage.getLayout = function getLayout(page) {
  return (
    <Layout cookies={page?.props?.cookies} title='Tableau de bord - Garde meubles' description="Gérez vos besoins de stockage de meubles directement depuis votre tableau de bord." keywords='tableau de bord de stockage de meubles, stockage, meubles, tableau de bord, déménagement' pageId='dashboard-furnitures-storage' withoutHeader>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  )
}

export default DashboardFurnituresStoragePage;
