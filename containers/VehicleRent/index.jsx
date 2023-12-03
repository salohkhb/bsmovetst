import styled from "styled-components";

import VehicleRentFooter from "./Components/VehicleRentFooter";
import VehicleRentPresentationFAQ from "./Components/VehicleRentPresentationFAQ";
import VehicleRentPresentationHeaderSection from "./Components/VehicleRentPresentationHeaderSection";
import VehicleRentPresentationContentSection from "./Components/VehicleRentPresentationContentSection";
import VehicleRentSearchSection from './Components/VehicleRentSearchSection'

export const S = {};

S.Content = styled.span`
  color: ${(props) => props.theme.colors.disabledGrey};
`;

const VehicleRentContainer = () => {
  return (
    <div>
      <VehicleRentPresentationHeaderSection />
      <VehicleRentSearchSection />
      <VehicleRentPresentationContentSection />
      <VehicleRentPresentationFAQ />
      <VehicleRentFooter />
    </div>
  );
};

export default VehicleRentContainer;
