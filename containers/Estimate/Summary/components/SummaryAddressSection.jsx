import Divider from "@mui/material/Divider";
import EstimateSection from "../../section";
import messages from "../messages";
import styles from "../index.module.css";
import { formatDate } from "../../../../helpers/functions";
import {
  DEPARTURE_FOOT_DISTANCE_OPTIONS,
  DEPARTURE_FURNITURES_LIFT_OPTIONS,
  DEPARTURE_ELEVATOR_OPTIONS,
} from "../../Details/constants";
import { EstimateSummaryInformationBlock, UNKNOW } from "../index";
import { useEstimate } from "../../../../hooks/estimate";
import { useEffect, useState } from "react";
import { getDistanceWithCoordinates } from "../../index";

const SummaryAddressSection = () => {
  const {
    estimate,
    estimate: {
      details: {
        departureInformations = {},
        arrivalInformations = {},
        arrivalDateInformations: { departureDate, flexible } = {},
      } = {},
    } = {},
  } = useEstimate();
  const [km, setKm] = useState("0");

  useEffect(() => {
    async function getKm() {
      const km = await getDistanceWithCoordinates(
        departureInformations?.address,
        arrivalInformations?.address
      );
      setKm((km || 0).toFixed(0));
    }
    if (departureInformations?.address && arrivalInformations.address) {
      getKm();
    }
  }, [arrivalInformations, departureInformations]);

  return (
    <EstimateSection title={messages.sections.informations.title}>
      <div className={styles.estimate_informations_container}>
        <Divider />
        <h3>Départ</h3>
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.date}
          content={flexible ? "Flexible" : formatDate(departureDate, "LLLL")}
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.departure}
          content={departureInformations?.address?.placeName || UNKNOW}
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.departureFloors}
          content={
            departureInformations?.floor >= 0
              ? departureInformations?.floor
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.departureElevator}
          content={
            departureInformations?.elevator
              ? DEPARTURE_ELEVATOR_OPTIONS.find(
                  (option) => option.value === departureInformations?.elevator
                )?.label
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={
            messages.sections.informations.blockLabel.departureHasFurnituresLift
          }
          content={departureInformations?.furnituresLift ? "Oui" : "Non"}
        />
        <EstimateSummaryInformationBlock
          label={
            messages.sections.informations.blockLabel.departureFootDistance
          }
          content={
            departureInformations?.footDistance
              ? DEPARTURE_FOOT_DISTANCE_OPTIONS.find(
                  (option) =>
                    option.value === departureInformations?.footDistance
                )?.label
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={
            messages.sections.informations.blockLabel.departureNeedParkingPermit
          }
          content={departureInformations?.parkingPermit ? "Oui" : "Non"}
        />
        <Divider />
        <h3>Arrivée</h3>
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.arrival}
          content={arrivalInformations?.address?.placeName || UNKNOW}
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.arrivalFloors}
          content={
            arrivalInformations?.floor >= 0
              ? arrivalInformations?.floor
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.arrivalElevator}
          content={
            arrivalInformations?.elevator
              ? DEPARTURE_ELEVATOR_OPTIONS.find(
                  (option) => option.value === arrivalInformations?.elevator
                )?.label
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={
            messages.sections.informations.blockLabel.arrivalHasFurnituresLift
          }
          content={arrivalInformations?.furnituresLift ? "Oui" : "Non"}
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.arrivalFootDistance}
          content={
            arrivalInformations?.footDistance
              ? DEPARTURE_FOOT_DISTANCE_OPTIONS.find(
                  (option) => option.value === arrivalInformations?.footDistance
                )?.label
              : UNKNOW
          }
        />
        <EstimateSummaryInformationBlock
          label={
            messages.sections.informations.blockLabel.arrivalNeedParkingPermit
          }
          content={arrivalInformations?.parkingPermit ? "Oui" : "Non"}
        />
        <EstimateSummaryInformationBlock
          label={messages.sections.informations.blockLabel.km}
          content={`${km}km`}
        />
      </div>
    </EstimateSection>
  );
};

export default SummaryAddressSection;
