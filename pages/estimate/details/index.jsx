import { useState } from "react";

import Layout from "../../../components/Layout";
import NavHeader from "../../../components/NavHeader";
import Footer from "../../../components/Footer";
import Component from "../../../containers/Estimate";
import { handlePageRedirect, parseCookies } from "../../../helpers/functions";
import { NAV_HEADER_ESTIMATE_STEPS } from "../../../helpers/constants";

const EstimateDetailsPage = ({ cookies }) => {
  const [step, setStep] = useState(0);
  return (
    <Layout
      cookies={cookies}
      title="BS Move - Détails de devis Déménagement Renseignements"
      description="Consultez les détails de votre estimation de déménagement, y compris le volume estimé et les services inclus."
      keywords="Devis, estimate, Details, Renseignements, Devis Renseignements, estimation, déménagement, détails, volume, services, inclus, déménageurs, véhicules, matériel, emballage, fournitures, cartons, déménager, déménageur, déménageurs, déménageuse, déménagements, relocation, logistique, camion, utilitaire, déménager pas cher, déménager seul, déménager avec des professionnels, déménager avec des amis, déménager avec des déménageurs, déménager avec des déménageuses, déménager avec des professionnels"
      pageId="estimate-details"
      withoutHeader
    >
      <NavHeader
        secondary
        initialStep={step}
        steps={NAV_HEADER_ESTIMATE_STEPS}
      />
      <Component step={step} setStep={setStep} />
      <Footer />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const cookies = await parseCookies(context?.req);
  const parsedCookies = cookies || {};
  return handlePageRedirect(parsedCookies, "common");
};

export default EstimateDetailsPage;
