import { useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton } from "@mui/material";

import { useEstimate } from "../../../hooks/estimate";
import DatePicker from "../../../components/Pickers/DatePicker";
import FormGroup from "../../../components/FormGroup";
import Select from "../../../components/Select";
import EstimateSection from "../section";

import {
  departureInformationsOptions,
  DEPARTURE_FOOT_DISTANCE_OPTIONS,
  DEPARTURE_FURNITURES_LIFT_OPTIONS,
  DEPARTURE_LIFT_OPTIONS,
} from "./constants";
import styles from "./index.module.css";
import messages from "./messages";
import { isObjectEmpty } from "../../../helpers/functions";
import FloorSelect from "../../../components/Utilities/FloorSelect";
import { any, bool } from "prop-types";
import GeolocationInput from "../../../components/GeolocationInput";

const arrivalDateInformationsSectionOptions = [
  { label: messages.radio.arrivalDateInformations.fixe, value: "fixe" },
  { label: messages.radio.arrivalDateInformations.flexible, value: "flexible" },
];

const ArrivalDateInformationsSection = ({
  flexible,
  addToEstimateDetailsByKey,
}) => {
  const [departureDateValue, setDepartureDateValue] = useState(new Date());
  const [currentValue, setCurrentValue] = useState("fixe");

  async function handleDateChange(newDate) {
    setDepartureDateValue(newDate);
  }

  function handleRadioChange(event) {
    if (event.target.value === currentValue) return;
    setCurrentValue(event.target.value);
    addToEstimateDetailsByKey("arrivalDateInformations", {
      flexible: event.target.value === "flexible",
    });
  }

  useEffect(() => {
    if (departureDateValue && !flexible) {
      addToEstimateDetailsByKey("arrivalDateInformations", {
        departureDate: departureDateValue,
      });
    } else if (flexible) {
      setCurrentValue("flexible");
      addToEstimateDetailsByKey("arrivalDateInformations", {
        departureDate: null,
      });
    }
  }, [departureDateValue, flexible]);

  return (
    <EstimateSection title={messages.sections.details.movingDate}>
      <div className={styles.estimate_arrival_date_information_section_content}>
        <FormGroup
          name={messages.radio.arrivalDateInformations.name}
          label=""
          defaultValue={arrivalDateInformationsSectionOptions[0].value}
          options={arrivalDateInformationsSectionOptions}
          currentValue={currentValue}
          onChange={handleRadioChange}
        />
        {!flexible ? (
          <div
            className={
              styles.estimate_arrival_date_information_section_content_date_picker_container
            }
          >
            <DatePicker
              defaultValue={null}
              value={departureDateValue}
              handleChange={handleDateChange}
            />
          </div>
        ) : null}
      </div>
    </EstimateSection>
  );
};

ArrivalDateInformationsSection.propType = {
  flexible: bool,
  flexiaddToEstimateDetailsByKeyble: any,
};

const DepartureInformationsSection = ({
  departureInformations,
  addToEstimateDetailsByKey,
}) => {
  const [currentRadioValue, setCurrentRadioValue] = useState("no");
  const { estimate: { details } } = useEstimate()
  const [values, setValues] = useState({
    address: departureInformations?.address?.placeName || '',
    floor: departureInformations?.floor || false,
    elevator: departureInformations?.elevator || false,
    footDistance: departureInformations?.footDistance || 0,
    furnituresLift: departureInformations?.furnituresLift || false,
    parkingPermit: departureInformations?.parkingPermit || false,
  });

  useEffect(() => {
    setValues(prev => ({
      ...prev,
      address: departureInformations?.address?.placeName,
      floor: departureInformations?.floor,
      elevator: departureInformations?.elevator,
      footDistance: departureInformations?.footDistance,
      furnituresLift: departureInformations?.furnituresLift,
      parkingPermit: departureInformations?.parkingPermit,
    }))
  }, [details])

  async function handleChange(event) {
    addToEstimateDetailsByKey("departureInformations", {
      [event.target.name]: event.target.value,
    });
  }

  function handleRadioChange(event) {
    if (event.target.value === currentRadioValue) return;
    setCurrentRadioValue(event.target.value);
    addToEstimateDetailsByKey("departureInformations", {
      [event.target.name]: event.target.value === "yes",
    });
  }

  useEffect(() => {
    setValues(departureInformations);
    setCurrentRadioValue(departureInformations?.parkingPermit ? "yes" : "no");
  }, [departureInformations]);

  return (
    <EstimateSection title={messages.sections.details.departure.title}>
      <div className={styles.estimate_departure_location_information_container}>
        <GeolocationInput
          name="departureAddress"
          initialInputValue={departureInformations?.address?.placeName}
          onChange={(value) => {
            addToEstimateDetailsByKey("departureInformations", {
              ["address"]: value,
            });
          }}
          placeholder={
            messages.sections.details["departureInformations"]?.input
              .placeholder
          }
        />
        <div
          className={
            styles.estimate_departure_location_information_select_options_container
          }
        >
          <FloorSelect
            label={messages.selects.floor.label}
            name={messages.selects.floor.name}
            onChange={handleChange}
            value={values?.floor}
            variant="filled"
          />
          {!(values?.floor === 0) ? (
            <Select
              label={messages.selects.elevator.label}
              name={messages.selects.elevator.name}
              onChange={handleChange}
              value={values?.elevator}
              options={DEPARTURE_LIFT_OPTIONS}
            />
          ) : null}
          <Select
            label={messages.selects.footDistance.label}
            name={messages.selects.footDistance.name}
            onChange={handleChange}
            value={values?.footDistance}
            options={DEPARTURE_FOOT_DISTANCE_OPTIONS}
          />
          {!(values?.floor === 0) ? (
            <Select
              label={messages.selects.furnituresLift.label}
              name={messages.selects.furnituresLift.name}
              onChange={handleChange}
              value={values?.furnituresLift}
              options={DEPARTURE_FURNITURES_LIFT_OPTIONS}
            />
          ) : null}
        </div>
        <div className={styles.estimate_parking_permit_container}>
          <div className={styles.estimate_parking_permit_question}>
            <span className={styles.estimate_page_subtitle}>
              {messages.sections.details.departure.parkingPermit.text}
            </span>
            <span className={styles.estimate_details_page_parking_permit_link}>
              {messages.sections.details.departure.parkingPermit.link}
            </span>
            <IconButton onClick={() => {}} size="large">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
          <FormGroup
            name={messages.radio.departureInformations.name}
            label=""
            defaultValue={departureInformationsOptions[0].value}
            options={departureInformationsOptions}
            currentValue={currentRadioValue}
            onChange={handleRadioChange}
          />
        </div>
      </div>
    </EstimateSection>
  );
};

const ArrivalInformationsSection = ({
  arrivalInformations,
  addToEstimateDetailsByKey,
}) => {
  const [currentRadioValue, setCurrentRadioValue] = useState("no");
  const { estimate: { details } } = useEstimate()

  const [values, setValues] = useState({
    address: arrivalInformations?.address?.placeName || '',
    floor: arrivalInformations?.floor || false,
    elevator: arrivalInformations?.elevator || false,
    footDistance: arrivalInformations?.footDistance || 0,
    furnituresLift: arrivalInformations?.furnituresLift || false,
    parkingPermit: arrivalInformations?.parkingPermit || false,
  });

  useEffect(() => {
    setValues(prev => ({
      ...prev,
      address: arrivalInformations?.address?.placeName,
      floor: arrivalInformations?.floor,
      elevator: arrivalInformations?.elevator,
      footDistance: arrivalInformations?.footDistance,
      furnituresLift: arrivalInformations?.furnituresLift,
      parkingPermit: arrivalInformations?.parkingPermit,
    }))
  }, [details])

  function handleChange(event) {
    addToEstimateDetailsByKey("arrivalInformations", {
      [event.target.name]: event.target.value,
    });
  }

  function handleRadioChange(event) {
    if (event.target.value === currentRadioValue) return;
    setCurrentRadioValue(event.target.value);
    addToEstimateDetailsByKey("arrivalInformations", {
      [event.target.name]: event.target.value === "yes",
    });
  }

  useEffect(() => {
    setValues(arrivalInformations);
    setCurrentRadioValue(arrivalInformations?.parkingPermit ? "yes" : "no");
  }, [arrivalInformations]);

  return (
    <EstimateSection title={messages.sections.details.arrival.title}>
      <div className={styles.estimate_departure_location_information_container}>
        <GeolocationInput
          name="arrivalAddress"
          isDisabled={false}
          initialInputValue={arrivalInformations?.address?.placeName}
          placeholder={
            messages.sections.details["arrivalInformations"]?.input.placeholder
          }
          onChange={(value) => {
            addToEstimateDetailsByKey("arrivalInformations", {
              ["address"]: value,
            });
          }}
        />
        <div
          className={
            styles.estimate_departure_location_information_select_options_container
          }
        >
          <FloorSelect
            label={messages.selects.floor.label}
            name={messages.selects.floor.name}
            onChange={handleChange}
            value={values?.floor}
            variant="filled"
          />
          {!(values?.floor === 0) ? (
            <Select
              label={messages.selects.elevator.label}
              name={messages.selects.elevator.name}
              onChange={handleChange}
              value={values?.elevator}
              options={DEPARTURE_LIFT_OPTIONS}
            />
          ) : null}
          <Select
            label={messages.selects.footDistance.label}
            name={messages.selects.footDistance.name}
            onChange={handleChange}
            value={values?.footDistance}
            options={DEPARTURE_FOOT_DISTANCE_OPTIONS}
          />
          {!(values?.floor === 0) ? (
            <Select
              label={messages.selects.furnituresLift.label}
              name={messages.selects.furnituresLift.name}
              onChange={handleChange}
              value={values?.furnituresLift}
              options={DEPARTURE_FURNITURES_LIFT_OPTIONS}
            />
          ) : null}
        </div>
        <div className={styles.estimate_parking_permit_container}>
          <div className={styles.estimate_parking_permit_question}>
            <span className={styles.estimate_page_subtitle}>
              {messages.sections.details.arrival.parkingPermit.text}
            </span>
            <span className={styles.estimate_details_page_parking_permit_link}>
              {messages.sections.details.arrival.parkingPermit.link}
            </span>
            <IconButton onClick={() => {}} size="large">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
          <FormGroup
            name={messages.radio.arrivalInformations.name}
            label=""
            defaultValue={departureInformationsOptions[0].value}
            options={departureInformationsOptions}
            currentValue={currentRadioValue}
            onChange={handleRadioChange}
          />
        </div>
      </div>
    </EstimateSection>
  );
};

const EstimateDetailsComponent = ({ handleContinue, canContinue = false }) => {
  const {
    estimate: { details = {} },
    addToEstimateDetailsByKey,
  } = useEstimate();

  useEffect(() => {
    if (
      (details?.arrivalDateInformations?.departureDate ||
        details?.arrivalDateInformations?.flexible === true) &&
      !isObjectEmpty(details?.departureInformations?.address) &&
      !isObjectEmpty(details?.arrivalInformations?.address)
    ) {
      handleContinue(true);
    } else {
      handleContinue(false);
    }
  }, [details]);

  return (
    <div className={styles.estimate_page_sections_container}>
      <ArrivalDateInformationsSection
        flexible={details?.arrivalDateInformations?.flexible}
        addToEstimateDetailsByKey={addToEstimateDetailsByKey}
      />
      <DepartureInformationsSection
        departureInformations={details?.departureInformations}
        addToEstimateDetailsByKey={addToEstimateDetailsByKey}
      />
      <ArrivalInformationsSection
        arrivalInformations={details?.arrivalInformations}
        addToEstimateDetailsByKey={addToEstimateDetailsByKey}
      />
    </div>
  );
};

export default EstimateDetailsComponent;
