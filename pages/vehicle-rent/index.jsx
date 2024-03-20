import { any } from "prop-types";
import Layout from "../../components/Layout";
import NavHeader from "../../components/NavHeader";
import Component from "../../containers/VehicleRent";
import { handlePageRedirect, parseCookies } from "../../helpers/functions";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Head from "next/head";

const VehicleRentPage = ({ cookies }) => {
  const router = useRouter();
  const rentType = useMemo(() => {
    if (router?.query?.tab) {
      return router?.query?.tab === "lift" ? "monte-meubles" : "camion";
    } else {
      return "";
    }
  }, [router.query]);
  return (
    <Layout
      cookies={cookies}
      title={`BS Move - Choix de la location${rentType ? ` de ${rentType}` : ""}`}
      description="Louez facilement des véhicules pour votre déménagement ou vos déplacements à des tarifs compétitifs."
      keywords="location, rent, véhicule, camion, déménagement, services, transports, monte-meubles, déménagement, déplacement, tarifs compétitifs, location de camion, location de monte-meubles, location de véhicule"
      pageId="vehicle-and-lift-rent"
    >
      <Head>
        <link rel="canonical" href="https://www.bsmove.com/vehicle-rent" />
      </Head>
      <NavHeader />
      <Component />
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, "common");
};

VehicleRentPage.propTypes = {
  cookies: any,
};

export default VehicleRentPage;
