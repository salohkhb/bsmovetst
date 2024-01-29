import styled from "styled-components";
import styles from "./index.module.css";

import VehicleRentFooter from "./Components/VehicleRentFooter";
import VehicleRentPresentationFAQ from "./Components/VehicleRentPresentationFAQ";
import VehicleRentPresentationHeaderSection from "./Components/VehicleRentPresentationHeaderSection";
import VehicleRentPresentationContentSection from "./Components/VehicleRentPresentationContentSection";
import VehicleRentSearchSection from "./Components/VehicleRentSearchSection";

export const S = {};

S.Content = styled.span`
  color: ${(props) => props.theme.colors.disabledGrey};
`;

const VehicleRentContainer = () => {
  return (
    <section className={styles.vehicle_rent__container}>
      <VehicleRentPresentationHeaderSection />
      <VehicleRentSearchSection />
      <VehicleRentPresentationContentSection />
      <VehicleRentPresentationFAQ />
      <VehicleRentFooter />
    </section>
  );
};

export default VehicleRentContainer;
