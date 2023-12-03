import { any } from 'prop-types';
import Layout from '../../../../components/Layout';
import NavHeader from '../../../../components/NavHeader';
import Component from '../../../../containers/Rent/Vehicle/Validation';
import { handlePageRedirect, parseCookies } from '../../../../helpers/functions';
import Footer from '../../../../components/Footer'
import { NAV_HEADER_VEHICLE_RENT_STEPS} from "../../../../helpers/constants";

const RentSummary = ({ cookies }) => (
    <Layout cookies={cookies} title='Validation de la location' pageId='vehicle-rent-validation' withoutHeader>
        <NavHeader secondary initialStep={3} steps={NAV_HEADER_VEHICLE_RENT_STEPS} />
        <Component />
        <Footer />
    </Layout>
);

export const getServerSideProps = async context => {
    const cookies = await parseCookies(context?.req);
    const parsedCookies = cookies || {};
    return handlePageRedirect(parsedCookies, 'private');
}

RentSummary.propTypes = {
    cookies: any
}

export default RentSummary;
