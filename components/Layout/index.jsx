
import Head from 'next/head';
import styled from 'styled-components';
import Fade from '@mui/material/Fade';

import Header from '../Header';
import LoadingComponent from '../LoadingComponent';
import styles from './index.module.css';
import { CookiesProvider } from '../../hooks/cookies';

const S = {};

S.ChildContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;
  display: ${({ display }) => display};
`;

export default function Layout({
  title = 'BS Move', pageId = 'bsmove', withoutHeader = false,
  children, loading, display = 'inherit', cookies = {}, description = 'Your default description',
  keywords = 'BS Move, Déménagement, Déménageur, Déménageur professionnel, déménagement, services, transport, logistique, location, véhicules, meubles, emballage, déménageurs, entreprise, devis, estimation, emménagement, emballage, fournitures, cartons, matériel, déménager, déménageur, déménageurs, déménageuse, déménagements, relocation, logistique, camion, utilitaire, déménager pas cher, déménager seul, déménager avec des professionnels, déménager avec des amis, déménager avec des déménageurs, déménager avec des déménageuses, déménager avec des professionnels'
}) {
  return (
    <CookiesProvider cookies={cookies}>
      <Fade in={true} timeout={500}>
        <div id={`${pageId}-page`} className={styles.container}>
          {loading
          ? <LoadingComponent />
          : (
            <S.ChildContainer display={display}>
              <Head>
                <title>{title}</title>
                {/* Added description and keywords as props */}
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
              </Head>
              {!withoutHeader && <Header />}
              {children}
            </S.ChildContainer>
          )}
        </div>
      </Fade>
    </CookiesProvider>
  )
};