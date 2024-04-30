
import { useRouter } from 'next/router';
import { omit } from 'ramda';

import { useLoading } from '../../hooks/loading';

import API from '../../helpers/api';
import Layout from '../../components/Layout';
import SigninContainer from '../../containers/SigninContainer';
import Component from '../../containers/Login';
import { ALERT } from '../../helpers/constants';
import messages from '../../containers/Login/messages';
import { useAlert } from '../../hooks/alert';
import Routes from '../../helpers/routes';
import { useCustomer } from '../../hooks/customer';
import { handlePageRedirect, isObjectEmpty, parseCookies } from '../../helpers/functions';
import {useGlobal} from "../../hooks/global";

const LoginPage = ({ history, cookies }) => {
  const router = useRouter();
  const { setGlobalLoading } = useLoading();
  const { setAlert } = useAlert();
  const { global } = useGlobal()
  const { setCustomer, setAuth } = useCustomer();

  async function handleSubmit({ email, password }) {
    if (!email || !password) {
      return setAlert({ severity: ALERT.ERROR, content: messages.alert.missingBoth });
    }
    setGlobalLoading(true);
    const response = await API.post('/Customers/login?include=user', {
      email, password,
    })
    setGlobalLoading(false);
    if (!isObjectEmpty(response) && response.ok) {
      setAlert({ severity: ALERT.SUCCESS, content: messages.alert.success });
      setAuth(omit(['user'], response?.data));
      setCustomer(response?.data?.user);
      if (global?.redirect && Object.values(Routes).includes(global.redirect)) {
        return router.push(global.redirect)
      }
      return router.push(Routes.HOME_PAGE);
    }
    if (!isObjectEmpty(response)) {
      if (response.data?.error?.code === "LOGIN_FAILED_EMAIL_NOT_VERIFIED") {
        setAlert({ severity: ALERT.ERROR, content: messages.alert.noVerify })
      } else if (response.data?.error?.code === "LOGIN_FAILED") {
        setAlert({ severity: ALERT.ERROR, content: messages.alert.wrongEmailOrPassword })
      }
    }
  }

  return (
    <Layout cookies={cookies} withoutHeader title='BS Move - Connexion' description='Connectez-vous à votre compte pour accéder à votre tableau de bord et gérer vos réservations.' keywords='connexion, compte, utilisateur, déménagement, services' pageId='login' display='flex'>
      <SigninContainer page='login'>
        <Component
          handleSubmit={handleSubmit}
          history={history}
        />
      </SigninContainer>
    </Layout>
  )
};

export const getServerSideProps = async context => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, 'public');
}

export default LoginPage;
