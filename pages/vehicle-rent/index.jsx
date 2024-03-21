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
      description="BS Move offre des services de location de véhicules adaptés à tous vos besoins de déménagement et de transport. Louez un camion, un véhicule, ou un monte-meubles facilement pour votre déménagement, déplacement, ou tout autre service de transport. Découvrez nos options de location de monte-meubles et véhicules pour faciliter votre déménagement."
      keywords="Louez, rent, véhicule, vehicle, location, déménagement, services, transports, monte-meubles, déménagement, déplacement, location de camion, location de monte-meubles, location de véhicule"
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
