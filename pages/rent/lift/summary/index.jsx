import { any } from 'prop-types';
import Layout from '../../../../components/Layout';
import NavHeader from '../../../../components/NavHeader';
import Component from '../../../../containers/Rent/Lift/Summary';
import { handlePageRedirect, parseCookies } from '../../../../helpers/functions';
import Footer from '../../../../components/Footer'
import {NAV_HEADER_LIFT_RENT_STEPS} from "../../../../helpers/constants";

const LiftRentSummaryPage = ({ cookies }) => (
    <Layout cookies={cookies} title='Résumé de la location' pageId='lift-rent-summary' withoutHeader>
        <NavHeader secondary initialStep={2} steps={NAV_HEADER_LIFT_RENT_STEPS} />
        <Component />
        <Footer />
    </Layout>
);

export const getServerSideProps = async context => {
    const cookies = await parseCookies(context?.req);
    const parsedCookies = cookies || {};
    return handlePageRedirect(parsedCookies, 'common');
}

LiftRentSummaryPage.propTypes = {
    cookies: any
}

export default LiftRentSummaryPage;
