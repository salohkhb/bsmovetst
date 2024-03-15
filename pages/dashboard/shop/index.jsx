

import Layout from '../../../components/Layout';
import DashboardLayout from '../../../containers/Dashboard/Layout';
import Component from '../../../containers/Dashboard/Containers/Shop';
import { handlePageRedirect, parseCookies } from '../../../helpers/functions';

const DashboardShopPage = ({ cookies }) => (
  <Component />
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'admin', '', parsedCookies?.order?.items?.length);
}

DashboardShopPage.getLayout = function getLayout(page) {
  return (
    <Layout cookies={page?.props?.cookies} title='Tableau de bord - Magasin' description="Explorez notre boutique directement depuis votre tableau de bord pour acheter des fournitures de déménagement et d'autres produits."
    keywords='boutique, achats, produits, meubles, déménagement'
    pageId='dashboard-shop' withoutHeader>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  )
}

export default DashboardShopPage;
