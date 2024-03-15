

import Layout from '../../../../../components/Layout';
import DashboardLayout from '../../../../../containers/Dashboard/Layout';
import DashboardDetailLayout from '../../../../../containers/Dashboard/Containers/Moving/Detail/layout';

import Component from '../../../../../containers/Dashboard/Containers/Moving/Detail/EstimateDenied';
import { handlePageRedirect, parseCookies } from '../../../../../helpers/functions';

const DashboardMovingDetailDeniedPage = ({ cookies }) => (
  <Component />
)

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'admin', '', parsedCookies?.order?.items?.length);
}

DashboardMovingDetailDeniedPage.getLayout = function getLayout(page) {
  return (
    <Layout cookies={page?.props?.cookies} title='Tableau de bord - Refuser le devis' description="Page de détails du déménagement - Devis refusé" keywords='détails du déménagement refusés, déménagement, détails, refusé, tableau de bord' pageId='dashboard-moving-detail-denied' withoutHeader>
      <DashboardLayout>
        <DashboardDetailLayout>
          {page}
        </DashboardDetailLayout>
      </DashboardLayout>
    </Layout>
  )
}

export default DashboardMovingDetailDeniedPage;
