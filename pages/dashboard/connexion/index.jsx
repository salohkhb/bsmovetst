

import Layout from '../../../components/Layout';
import Component from '../../../containers/Login';
import {handlePageRedirect, isObjectEmpty, parseCookies} from '../../../helpers/functions';
import SigninContainer from "../../../containers/SigninContainer";
import {useRouter} from "next/router";
import {useLoading} from "../../../hooks/loading";
import {useAlert} from "../../../hooks/alert";
import {useCustomer} from "../../../hooks/customer";
import {ALERT} from "../../../helpers/constants";
import messages from "../../../containers/Login/messages";
import API from "../../../helpers/api";
import Routes from "../../../helpers/routes";

const DashboardLoginPage = ({ cookies }) => {
    const router = useRouter();
    const { setGlobalLoading } = useLoading();
    const { setAlert } = useAlert();
    const { setAdmin } = useCustomer();

    async function handleSubmit({ email, password }) {
        if (!email || !password) {
            return setAlert({ severity: ALERT.ERROR, content: messages.alert.missingBoth });
        }
        setGlobalLoading(true);
        const response = await API.post('/Users/login?include=user', {
            email, password,
        })
        setGlobalLoading(false);
        if (!isObjectEmpty(response) && response.ok) {
            setAlert({ severity: ALERT.SUCCESS, content: messages.alert.success });
            setAdmin(response?.data);
            return router.push(Routes.DASHBOARD_PAGE);
        }
        if (!isObjectEmpty(response)) {
        }
    }
    return (
        <Component page="login-admin" handleSubmit={handleSubmit} />
    )
}

export const getServerSideProps = async context => {
    const cookies = await parseCookies(context?.req);

    const parsedCookies = cookies || {};
    return handlePageRedirect(parsedCookies);
}

DashboardLoginPage.getLayout = function getLayout(page) {
    return (
        <Layout
            cookies={page?.props?.cookies}
            withoutHeader
            title='Tableau de bord Connexion - BS Move'
            description='Connectez-vous à votre tableau de bord pour accéder à toutes les fonctionnalités de gestion de compte.'
            keywords='connexion au tableau de bord, compte, utilisateur, connexion, déménagement'
            pageId='dashboard-login'
            display='flex'
        >
            <SigninContainer page='login-admin'>
                {page}
            </SigninContainer>
        </Layout>
    )
}

export default DashboardLoginPage;
