import { createContext, useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";

import { isObjectEmpty } from "../helpers/functions";
import axios from "axios";

const EstimateContext = createContext({
  setEstimate: (estimate) => undefined,
});

const openRouteServiceUrl =
  "https://api.openrouteservice.org/v2/directions/driving-car";

// TODO : CREER UNE VARIABLE DANS LE DASHBOARD POUR RECUPERER UNE VARIABLE DE PRIX
const VARIABLE_COEFFICIENT = 1.15; // rename in english
function getBasePrice(km, volume = 1) {
  // si pas volume ou km, retour 0
  let basePrice;
  if (volume >= 10) {
    basePrice =
      (((volume - 20) * 0.045 + 1.7) * km + 32 * volume) * VARIABLE_COEFFICIENT;
  } else {
    basePrice = (1.34 * km + (23 * volume + 300)) * VARIABLE_COEFFICIENT;
  }
  return basePrice;
}

function getPriceWithElevator(
  basePrice = 0,
  volume = 1,
  nbOfFloors,
  elevatorValue,
  hasLift
) {
  if (
    !nbOfFloors || // Ground floor -> no additional cost
    elevatorValue === ""
  ) {
    return basePrice;
  }
  let priceWithElevator = 0;
  if (hasLift) {
    priceWithElevator = basePrice + nbOfFloors * volume * 1.5 * 0.1 + 250;
  } else {
    if (elevatorValue === false) {
      priceWithElevator = basePrice + nbOfFloors * volume * 1.5;
    } else if (elevatorValue === "more") {
      priceWithElevator = basePrice + nbOfFloors * volume * 1.5 * 0.1;
    } else if (elevatorValue === "five_to_six") {
      priceWithElevator = basePrice + nbOfFloors * volume * 1.5 * 0.2;
    } else if (elevatorValue === "three_to_four") {
      priceWithElevator = basePrice + nbOfFloors * volume * 1.5 * 0.35;
    } else if (elevatorValue === "one_to_two") {
      priceWithElevator = basePrice + nbOfFloors * volume * 1.5 * 0.5;
    }
  }
  return priceWithElevator;
}

// TODO : Replace with wording Carrying
function getPriceWithPortage(
  basePrice = 0,
  priceWithElevator = 0,
  volume = 1,
  portageValue
) {
  if (!volume || !portageValue) {
    return basePrice;
  }

  let priceWithPortage;
  if (portageValue === "11_20") {
    priceWithPortage = priceWithElevator + 0.5 * volume * 10;
  } else if (portageValue === "21_30") {
    priceWithPortage = priceWithElevator + 0.5 * volume * 20;
  } else if (portageValue === "31_40") {
    priceWithPortage = priceWithElevator + 0.5 * volume * 30;
  } else if (portageValue === "41_50") {
    priceWithPortage = priceWithElevator + 0.5 * volume * 40;
  } else if (portageValue === "more") {
    priceWithPortage = priceWithElevator + 0.5 * volume * 50;
  }
  return priceWithPortage;
}

// function getTotalVolumeFromRooms(rooms) {
//   if (!rooms?.length) return 0
//   let total = 0;
//   total = rooms.reduce((acc, room) => {
//     if (room.total) acc += Number(room.total)
//     return acc
//   }, 0)
//   return total
// }

export function getTotalVolumeAndQuantityFromRooms(rooms) {
  if (!rooms?.length) return { volume: 0, quantity: 0 };

  let total = {
    volume: 0,
    quantity: 0,
  };
  total = rooms.reduce(
    (acc, room) => {
      if (room.quantity)
        acc.quantity = parseFloat(room.quantity + acc.quantity);
      if (room.volume) acc.volume = parseFloat(room.volume + acc.volume);
      return acc;
    },
    { quantity: 0, volume: 0 }
  );
  return total;
}

export const EstimateProvider = ({ children, initialEstimate }) => {
  const [estimate, setEstimate] = useState({});
  const [priceCalculator, setPriceCalculator] = useState({
    km: 0,
    priceWithKmAndVolume: 0,
    priceWithElevator: 0,
    priceWithPortage: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    if (isObjectEmpty(estimate)) return; // ici checker toute les parties, sinon tout refaire à chaque fois?
    Cookie.set("estimate", JSON.stringify(estimate));
  }, [estimate]);

  useEffect(() => {
    if (estimate?.inventory?.volume?.updatedByCalculator) {
      const { volume, quantity } = getTotalVolumeAndQuantityFromRooms(
        estimate?.inventory?.volume?.rooms
      );
      setEstimate((previousEstimate) => ({
        ...previousEstimate,
        inventory: {
          ...previousEstimate.inventory,
          volume: {
            ...previousEstimate.inventory.volume,
            volume,
            quantity,
          },
        },
      }));
    }
  }, [estimate?.inventory?.volume?.rooms]);

  async function getKmBetweenDistances(startCoord, endCoord) {
    try {
      const params = {
        api_key: process.env.NEXT_PUBLIC_OPEN_ROUTE_SERVICE_KEY,
        start: `${startCoord.lon},${startCoord.lat}`,
        end: `${endCoord.lon},${endCoord.lat}`,
      };

      const response = await axios.get(openRouteServiceUrl, { params });
      const data = response.data;

      // Extract distance in km from the response
      return data.features[0].properties.segments[0].distance / 1000;
    } catch (error) {
      console.error("Error calculating driving distance:", error);
      return null;
    }
  }

  useEffect(() => {
    setPriceCalculator((prevPriceCalculator) => ({
      ...prevPriceCalculator,
      totalPrice:
        priceCalculator.priceWithKmAndVolume +
        priceCalculator.priceWithElevator +
        priceCalculator.priceWithPortage,
    }));
  }, [
    priceCalculator.priceWithKmAndVolume,
    priceCalculator.priceWithElevator,
    priceCalculator.priceWithPortage,
  ]);

  useEffect(() => {
    if (
      !estimate?.details?.departureInformations?.address?.lat ||
      !estimate?.details?.departureInformations?.address?.lng ||
      !estimate?.details?.arrivalInformations?.address?.lat ||
      !estimate?.details?.arrivalInformations?.address?.lng
    ) {
      setPriceCalculator((prevPriceCalculator) => ({
        ...prevPriceCalculator,
        km: 0,
      }));
      return;
    }

    const departureCoords = {
      lat: estimate?.details?.departureInformations?.address?.lat,
      lon: estimate?.details?.departureInformations?.address?.lng,
    };

    const arrivalCoords = {
      lat: estimate?.details?.arrivalInformations?.address?.lat,
      lon: estimate?.details?.arrivalInformations?.address?.lng,
    };

    async function getKmFromCoordinates() {
      const km = await getKmBetweenDistances(departureCoords, arrivalCoords);
      setPriceCalculator((prevPriceCalculator) => ({
        ...prevPriceCalculator,
        km,
      }));
    }

    getKmFromCoordinates();
  }, [
    estimate?.details?.departureInformations?.address,
    estimate?.details?.arrivalInformations?.address,
  ]);

  useEffect(() => {
    if (priceCalculator.km) {
      if (estimate?.inventory?.volume?.size) {
        setPriceCalculator((prevPriceCalculator) => ({
          ...prevPriceCalculator,
          priceWithKmAndVolume: parseInt(
            getBasePrice(
              priceCalculator.km,
              parseInt(estimate?.inventory?.volume?.size)
            )
          ),
        }));
      } else {
        setPriceCalculator((prevPriceCalculator) => ({
          ...prevPriceCalculator,
          priceWithKmAndVolume: parseInt(getBasePrice(priceCalculator.km, 1)),
        }));
      }
    }
  }, [priceCalculator.km, estimate?.inventory?.volume?.size]);

  useEffect(() => {
    setPriceCalculator((prevPriceCalculator) => ({
      ...prevPriceCalculator,
      priceWithElevator: parseInt(
        getPriceWithElevator(
          priceCalculator.priceWithKmAndVolume,
          estimate?.inventory?.volume?.size,
          estimate?.details?.departureInformations?.floor,
          estimate?.details?.departureInformations?.elevator,
          estimate?.details?.departureInformations?.furnituresLift
        )
      ),
    }));
  }, [
    priceCalculator.priceWithKmAndVolume,
    parseInt(estimate?.inventory?.volume?.size),
    estimate?.details?.departureInformations?.floor,
    estimate?.details?.departureInformations?.elevator,
    estimate?.details?.departureInformations?.furnituresLift,
  ]);

  useEffect(() => {
    setPriceCalculator((prevPriceCalculator) => ({
      ...prevPriceCalculator,
      priceWithPortage: parseInt(
        getPriceWithPortage(
          priceCalculator.priceWithKmAndVolume,
          priceCalculator.priceWithElevator,
          parseInt(estimate?.inventory?.volume?.size),
          estimate?.details?.departureInformations?.footDistance
        )
      ),
    }));
  }, [
    priceCalculator.priceWithKmAndVolume,
    priceCalculator.priceWithElevator,
    estimate?.inventory?.volume?.size,
    estimate?.details?.departureInformations?.footDistance,
  ]);

  function addToEstimateByKey(key, value) {
    return setEstimate((previousEstimate) => ({
      ...previousEstimate,
      [key]: value,
    }));
  }

  function addToEstimateDetailsByKey(key, value) {
    return setEstimate((previousEstimate) => ({
      ...previousEstimate,
      details: {
        ...previousEstimate?.details,
        [key]: {
          ...previousEstimate?.details?.[key],
          ...value,
        },
      },
    }));
  }

  function addToEstimateInventoryByKey(key, value) {
    return setEstimate((previousEstimate) => ({
      ...previousEstimate,
      inventory: {
        ...previousEstimate?.inventory,
        [key]: {
          ...previousEstimate?.inventory?.[key],
          ...value,
        },
      },
    }));
  }

  function clearEstimate() {
    setEstimate({});
    setPriceCalculator({});
    Cookie.remove("estimate");
  }

  function isFirstEstimateStepValid() {
    return !isObjectEmpty(estimate.details);
  }

  console.log("rooms : ", estimate?.inventory?.volume);

  return (
    <EstimateContext.Provider
      value={{
        estimate,
        setEstimate,
        priceCalculator,
        setPriceCalculator,
        getKmBetweenDistances,
        addToEstimateByKey,
        addToEstimateDetailsByKey,
        addToEstimateInventoryByKey,
        clearEstimate,
        isFirstEstimateStepValid,
      }}
    >
      {children}
    </EstimateContext.Provider>
  );
};

export const useEstimate = () => useContext(EstimateContext);
