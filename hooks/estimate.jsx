import { createContext, useContext, useState, useEffect } from "react";
import Cookie from "js-cookie";

import { isObjectEmpty } from "../helpers/functions";
import axios from "axios";

const EstimateContext = createContext({
  setEstimate: (estimate) => undefined,
});

const openRouteServiceUrl =
  "https://api.openrouteservice.org/v2/directions/driving-car";

const COEFFICIENT = 1.15; // rename in english
function getBasePrice(km = 0, volume = 1) {
  let basePrice = 0;
  if (volume > 10) {
    basePrice =
      (((volume - 20) * 0.045 + 1.7) * km + 32 * volume) * COEFFICIENT;
  } else {
    basePrice = 1.34 * km + (23 * volume + 300) * COEFFICIENT;
  }
  return basePrice;
}

function getPriceWithElevator(
  volume = 1,
  nbOfFloors, // étages
  elevatorValue, // type d'ascenseur
  hasLift = false
) {
  let priceWithElevator = 0;
  if (
    !nbOfFloors || // Ground floor -> no additional cost
    !elevatorValue
  ) {
    return priceWithElevator;
  }
  if (hasLift) {
    // a un monte meuble
    priceWithElevator = nbOfFloors * volume * 1.5 * 0.1 + 250;
  } else {
    if (elevatorValue === "no") {
      priceWithElevator = nbOfFloors * volume * 1.5;
    } else if (elevatorValue === "more") {
      priceWithElevator = nbOfFloors * volume * 1.5 * 0.1;
    } else if (elevatorValue === "five_to_six") {
      priceWithElevator = nbOfFloors * volume * 1.5 * 0.2;
    } else if (elevatorValue === "three_to_four") {
      priceWithElevator = nbOfFloors * volume * 1.5 * 0.35;
    } else if (elevatorValue === "one_to_two") {
      priceWithElevator = nbOfFloors * volume * 1.5 * 0.5;
    }
  }
  return priceWithElevator;
}

function getPriceWithPortage(volume = 1, portageValue) {
  if (!volume || !portageValue) {
    return 0;
  }

  let priceWithPortage = 0;
  if (portageValue === "11_20") {
    priceWithPortage = 0.5 * volume * 10;
  } else if (portageValue === "21_30") {
    priceWithPortage = 0.5 * volume * 20;
  } else if (portageValue === "31_40") {
    priceWithPortage = 0.5 * volume * 30;
  } else if (portageValue === "41_50") {
    priceWithPortage = 0.5 * volume * 40;
  } else if (portageValue === "more") {
    priceWithPortage = 0.5 * volume * 50;
  }
  return priceWithPortage;
}

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

export function getPriceForHeavyObjects(
  heavyObjectList = {},
  defaultFloors = 1
) {
  let heavyObjectsPrice = 0;
  Object.entries(heavyObjectList).forEach(([objKey, heavyObject]) => {
    if (heavyObject.type && heavyObject.floors) {
      switch (heavyObject.type) {
        case "straight_piano": {
          heavyObjectsPrice += 250 + 50 * (heavyObject.floors || defaultFloors);
          break;
        }
        case "pool_table":
        case "safe":
        case "other": {
          heavyObjectsPrice += 200 + 50 * (heavyObject.floors || defaultFloors);
          break;
        }
        case "american_fridge": {
          heavyObjectsPrice += 150 + 25 * (heavyObject.floors || defaultFloors);
          break;
        }
        case "one_quarter_piano": {
          heavyObjectsPrice += 300 + 75 * (heavyObject.floors || defaultFloors);
          break;
        }
        case "one_half_piano": {
          heavyObjectsPrice += 350 + 80 * (heavyObject.floors || defaultFloors);
          break;
        }
        case "three_third_piano": {
          heavyObjectsPrice += 400 + 90 * (heavyObject.floors || defaultFloors);
          break;
        }
        default:
          heavyObjectsPrice += 200 + 50 * (heavyObject.floors || defaultFloors);
          break;
      }
    }
  });
  return heavyObjectsPrice;
}

function getPriceForMounting(mounting = {}) {
  if (
    !mounting.mountingType ||
    mounting.mountingType === "no" ||
    !mounting.items
  ) {
    return 0;
  }
  let mountingPrice = 0;
  if (mounting.mountingType === "disassemblingMounting") {
    Object.entries(mounting.items).forEach(([objKey, item]) => {
      switch (objKey) {
        case "simple": {
          mountingPrice += (item.count || 0) * 20;
          break;
        }
        case "medium": {
          mountingPrice += (item.count || 0) * 50;
          break;
        }
        case "hard": {
          mountingPrice += (item.count || 0) * 80;
          break;
        }
      }
    });
  } else {
    Object.entries(mounting.items).forEach(([objKey, item]) => {
      switch (objKey) {
        case "simple": {
          mountingPrice += (item.count || 0) * 10;
          break;
        }
        case "medium": {
          mountingPrice += (item.count || 0) * 25;
          break;
        }
        case "hard": {
          mountingPrice += (item.count || 0) * 40;
          break;
        }
      }
    });
  }
  return mountingPrice;
}

export const EstimateProvider = ({ children, initialEstimate }) => {
  const [estimate, setEstimate] = useState({});
  const [priceCalculator, setPriceCalculator] = useState({
    km: 0,
    priceWithKmAndVolume: 0,
    priceWithElevator: 0,
    priceWithPortage: 0,
    priceHeavyObjects: 0,
    priceMounting: 0,
    priceForStandardFurnitures: 0,
    priceForStandardWrapping: 0,
    priceForFragileFurnitures: 0,
    priceForFragileWrapping: 0,
    priceForOtherFurnitures: 0,
    priceExtraFurnitures: 0,
    totalPrice: 0,
  });

  function getPriceForExtraFurnitures(extraFurnitures) {
    let priceForExtraFurnitures = 0;
    if (extraFurnitures.standard?.items?.length) {
      let totalStandardBoxesQuantity = 0;
      let totalStandardBoxesPrice = 0;
      totalStandardBoxesPrice = extraFurnitures.standard.items.reduce(
        (accumulator, current) => {
          accumulator += current.count * Number(current.price);
          totalStandardBoxesQuantity += current.count;
          return accumulator;
        },
        0
      );
      setPriceCalculator((prev) => ({
        ...prev,
        priceForStandardFurnitures: totalStandardBoxesPrice,
      }));
      if (extraFurnitures.standard.isHelpNeededToWrap) {
        priceForExtraFurnitures += totalStandardBoxesQuantity * 1.5;
        setPriceCalculator((prev) => ({
          ...prev,
          priceForStandardWrapping: totalStandardBoxesQuantity * 1.5,
        }));
      } else {
        setPriceCalculator((prev) => ({
          ...prev,
          priceForStandardWrapping: 0,
        }));
      }
      priceForExtraFurnitures += totalStandardBoxesPrice;
    }
    if (extraFurnitures.fragile?.items?.length) {
      let totalFragileBoxesQuantity = 0;
      let totalFragileBoxesPrice = 0;
      totalFragileBoxesPrice = extraFurnitures.fragile.items.reduce(
        (accumulator, current) => {
          accumulator += current.count * Number(current.price);
          totalFragileBoxesQuantity +=
            current.category === "fragile" ? current.count : 0;
          return accumulator;
        },
        0
      );
      setPriceCalculator((prev) => ({
        ...prev,
        priceForFragileFurnitures: totalFragileBoxesPrice,
      }));
      if (extraFurnitures.fragile.isHelpNeededToWrap) {
        priceForExtraFurnitures += totalFragileBoxesQuantity * 3.5;
        setPriceCalculator((prev) => ({
          ...prev,
          priceForFragileWrapping: totalFragileBoxesQuantity * 3.5,
        }));
      } else {
        setPriceCalculator((prev) => ({
          ...prev,
          priceForFragileWrapping: 0,
        }));
      }
      priceForExtraFurnitures += totalFragileBoxesPrice;
    }
    if (extraFurnitures.others?.items?.length) {
      let totalOthersBoxesPrice = 0;
      totalOthersBoxesPrice = extraFurnitures.others.items.reduce(
        (accumulator, current) => {
          accumulator += current.count * Number(current.price);
          return accumulator;
        },
        0
      );
      priceForExtraFurnitures += totalOthersBoxesPrice;
    }
    return priceForExtraFurnitures;
  }

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

  // calcul for total price
  useEffect(() => {
    setPriceCalculator((prevPriceCalculator) => ({
      ...prevPriceCalculator,
      totalPrice:
        priceCalculator.priceWithKmAndVolume +
        priceCalculator.priceWithElevator +
        priceCalculator.priceWithPortage +
        priceCalculator.priceHeavyObjects +
        priceCalculator.priceExtraFurnitures +
        priceCalculator.priceMounting,
    }));
  }, [
    priceCalculator.priceWithKmAndVolume,
    priceCalculator.priceWithElevator,
    priceCalculator.priceWithPortage,
    priceCalculator.priceHeavyObjects,
    priceCalculator.priceExtraFurnitures,
    priceCalculator.priceMounting,
  ]);

  // Effect to get the km
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

  // EFFECT WHEN WE HAVE THE KM TO GET THE BASE PRICE
  useEffect(() => {
    if (estimate?.inventory?.volume?.volume) {
      setPriceCalculator((prevPriceCalculator) => ({
        ...prevPriceCalculator,
        priceWithKmAndVolume: parseInt(
          getBasePrice(
            priceCalculator.km,
            parseInt(estimate?.inventory?.volume?.volume)
          )
        ),
      }));
    } else {
      setPriceCalculator((prevPriceCalculator) => ({
        ...prevPriceCalculator,
        priceWithKmAndVolume: parseInt(getBasePrice(priceCalculator.km, 1)),
      }));
    }
  }, [priceCalculator.km, estimate?.inventory?.volume?.volume]);

  // EFFECT WHEN WE ALREADY HAVE THE priceWithKmAndVolume PRICE
  useEffect(() => {
    const departurePrice = getPriceWithElevator(
      estimate?.inventory?.volume?.volume,
      estimate?.details?.departureInformations?.floor,
      estimate?.details?.departureInformations?.elevator,
      estimate?.details?.departureInformations?.furnituresLift
    );
    const arrivalPrice = getPriceWithElevator(
      estimate?.inventory?.volume?.volume,
      estimate?.details?.arrivalInformations?.floor,
      estimate?.details?.arrivalInformations?.elevator,
      estimate?.details?.arrivalInformations?.furnituresLift
    );
    setPriceCalculator((prevPriceCalculator) => ({
      ...prevPriceCalculator,
      priceWithElevator: parseInt((departurePrice || 0) + (arrivalPrice || 0)),
    }));
  }, [
    estimate?.details?.departureInformations?.floor,
    estimate?.details?.departureInformations?.elevator,
    estimate?.details?.departureInformations?.furnituresLift,
    estimate?.details?.arrivalInformations?.floor,
    estimate?.details?.arrivalInformations?.elevator,
    estimate?.details?.arrivalInformations?.furnituresLift,
  ]);

  // EFFECT WHEN WE ALREADY HAVE THE PRICE WITH ELEVATOR
  useEffect(() => {
    const departurePrice = getPriceWithPortage(
      estimate?.inventory?.volume?.volume || 1,
      estimate?.details?.departureInformations?.footDistance
    );
    const arrivalPrice = getPriceWithPortage(
      estimate?.inventory?.volume?.volume || 1,
      estimate?.details?.arrivalInformations?.footDistance
    );
    setPriceCalculator((prevPriceCalculator) => ({
      ...prevPriceCalculator,
      priceWithPortage: parseInt(departurePrice + arrivalPrice),
    }));
  }, [
    estimate?.inventory?.volume?.volume,
    estimate?.details?.departureInformations?.footDistance,
    estimate?.details?.arrivalInformations?.footDistance,
  ]);

  // price for heavy objects in inventory
  useEffect(() => {
    if (estimate?.inventory?.heavyObjects?.hasHeavyObjects) {
      const heavyPrice = getPriceForHeavyObjects(
        estimate?.inventory?.heavyObjects?.items,
        estimate?.details?.departureInformations?.floors +
          estimate?.details?.arrivalInformations?.floors
      );
      setPriceCalculator((previousPrice) => ({
        ...previousPrice,
        priceHeavyObjects: heavyPrice,
      }));
    } else {
      setPriceCalculator((previousPrice) => ({
        ...previousPrice,
        priceHeavyObjects: 0,
      }));
    }
  }, [estimate?.inventory?.heavyObjects]);

  // price for mounting in inventory
  useEffect(() => {
    if (estimate?.inventory?.mounting) {
      setPriceCalculator((previousPriceCalculator) => ({
        ...previousPriceCalculator,
        priceMounting: getPriceForMounting(estimate?.inventory?.mounting),
      }));
    }
  }, [estimate?.inventory?.mounting]);

  useEffect(() => {
    if (estimate?.inventory?.mounting?.extraFurnitures?.needed) {
      const priceExtraFurnitures = getPriceForExtraFurnitures(
        estimate?.inventory?.mounting?.extraFurnitures
      );
      setPriceCalculator((previousPriceCalculator) => ({
        ...previousPriceCalculator,
        priceExtraFurnitures,
      }));
    }
  }, [estimate?.inventory?.mounting?.extraFurnitures]);

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
