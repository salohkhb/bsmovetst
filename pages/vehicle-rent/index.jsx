import { any } from "prop-types";
import Layout from "../../components/Layout";
import NavHeader from "../../components/NavHeader";
import Component from "../../containers/VehicleRent";
import { handlePageRedirect, parseCookies } from "../../helpers/functions";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import { useMemo } from "react";

const VehicleRentPage = ({ cookies }) => {
  const router = useRouter();
  const rentType = useMemo(
    () => (router?.query?.tab === "lift" ? "monte-meuble" : "camion"),
    [router.query]
  );
  return (
    <Layout
      cookies={cookies}
      title={`Choix de la location de ${rentType || "camion"}`}
      pageId="vehicle-and-lift-rent"
    >
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
