import { createContext, useContext, useEffect, useState } from "react";
import { isObjectEmpty } from "../helpers/functions";
import Cookie from "js-cookie";
import { useEstimate } from "./estimate";
import { FULL_DAY_DURATION, HALF_DAY_DURATION } from "../helpers/constants";

const RentContext = createContext({
  handleVehicleRent: () => {},
});

function getVehiclePriceFromKm(vehicleVolume, km, quantity, duration) {
  let price = 0;
  switch (vehicleVolume) {
    case 5: {
      if (duration === HALF_DAY_DURATION) {
        price = (142 + 1.34 * km) * quantity * 1.2;
      } else if (duration === FULL_DAY_DURATION) {
        price = (207 + 1.34 * km) * quantity * 1.2;
      }
      break;
    }
    case 12: {
      if (duration === HALF_DAY_DURATION) {
        price = (150 + 1.5 * km) * quantity * 1.2;
      } else if (duration === FULL_DAY_DURATION) {
        price = (225 + 1.5 * km) * quantity * 1.2;
      }
      break;
    }
    case 22: {
      if (duration === HALF_DAY_DURATION) {
        price = (164.5 + 1.79 * km) * quantity * 1.2;
      } else if (duration === FULL_DAY_DURATION) {
        price = (239.5 + 1.79 * km) * quantity * 1.2;
      }
      break;
    }
    case 32: {
      if (duration === HALF_DAY_DURATION) {
        price = (187 + 2.24 * km) * quantity * 1.2;
      } else if (duration === FULL_DAY_DURATION) {
        price = (262 + 2.24 * km) * quantity * 1.2;
      }
      break;
    }
    // les camions suivants -> que les 8h, changer la séléction de véhicule possible
    case 42: {
      price = (374.5 + 2.69 * km) * quantity * 1.2;
      break;
    }
    case 50: {
      price = (394.75 + 3.1 * km) * quantity * 1.2;
      break;
    }
    case 60: {
      price = (415 + 3.5 * km) * quantity * 1.2;
      break;
    }
    case 100: {
      price = (505 + 5.3 * km) * quantity * 1.2;
      break;
    }
    default:
      break;
  }
  return parseInt(price);
}

function getVehicleTotalPrice(vehicles = [], km, duration) {
  const totalPrice = vehicles.reduce((acc, current) => {
    acc += getVehiclePriceFromKm(
      current.volume,
      km,
      current.quantity,
      duration
    );
    return acc;
  }, 0);
  return totalPrice;
}
export const RentProvider = ({ children, initialValue }) => {
  const [rent, setRent] = useState({});
  const { getKmBetweenDistances } = useEstimate();

  function reduceItemsByKey(items = [], key) {
    const reduced = items?.reduce((acc, current) => acc + current[key], 0);
    return reduced;
  }

  useEffect(() => {
    if (rent?.vehicle?.items !== undefined) {
      handleVehicleRent({
        ...rent?.vehicle,
        totalQuantity: reduceItemsByKey(rent?.vehicle?.items, "quantity"),
        totalPrice: getVehicleTotalPrice(
          rent?.vehicle?.items,
          rent?.vehicle?.km,
          rent?.vehicle?.duration
        ),
      });
    }
  }, [rent?.vehicle?.items]);

  useEffect(() => {
    async function getKm() {
      const departureCoords = {
        lat: rent.startAddress?.lat,
        lon: rent.startAddress.lng,
      };
      const arrivalCoords = {
        lat: rent.endAddress?.lat,
        lon: rent.endAddress.lng,
      };
      const km = await getKmBetweenDistances(departureCoords, arrivalCoords);
      handleVehicleRent({
        ...rent.vehicle,
        km,
      });
    }

    if (rent.startAddress && rent.endAddress) {
      getKm();
    }
  }, [rent.startAddress, rent.endAddress]);

  function handleRentByKey(key, value) {
    setRent((previousRent) => ({
      ...previousRent,
      [key]: value,
    }));
  }

  function handleVehicleRent(values) {
    setRent((previousRent) => ({
      ...previousRent,
      vehicle: values,
    }));
  }

  function handleLiftRent(values) {
    setRent((previousRent) => ({
      ...previousRent,
      lift: values,
    }));
  }

  function handleWarehouseRent(values) {
    setRent((previousRent) => ({
      ...previousRent,
      warehouse: values,
    }));
  }

  function handleMoversRent(values) {
    setRent((previousRent) => ({
      ...previousRent,
      movers: values,
    }));
  }

  function handlePassageRent(values) {
    setRent((previousRent) => ({
      ...previousRent,
      passage: values,
    }));
  }

  function handleMoversRentByKey(key, value) {
    setRent((previousRent) => ({
      ...previousRent,
      movers: {
        ...previousRent.movers,
        [key]: value,
      },
    }));
  }

  function handleLiftRentByKey(key, value) {
    setRent((previousRent) => ({
      ...previousRent,
      lift: {
        ...previousRent.lift,
        [key]: value,
      },
    }));
  }

  function handleWarehouseRentByKey(key, value) {
    setRent((previousRent) => ({
      ...previousRent,
      warehouse: {
        ...previousRent.warehouse,
        [key]: value,
      },
    }));
  }

  function handleVehicleRentByKey(key, value) {
    setRent((previousRent) => ({
      ...previousRent,
      vehicle: {
        ...previousRent.vehicle,
        [key]: value,
      },
    }));
  }

  function handlePassageRentByKey(key, value) {
    setRent((previousRent) => ({
      ...previousRent,
      passage: {
        ...previousRent.passage,
        [key]: value,
      },
    }));
  }

  useEffect(() => {
    async function getRentKm() {
      if (rent?.vehicle?.startAddress && rent?.vehicle?.endAddress) {
        const km = await getKmBetweenDistances(
          {
            lon: rent?.vehicle?.startAddress?.lng,
            lat: rent?.vehicle?.startAddress?.lat,
          },
          {
            lon: rent?.vehicle?.endAddress?.lng,
            lat: rent?.vehicle?.endAddress?.lat,
          }
        );
        handleVehicleRentByKey("km", km);
      }
    }
    getRentKm();
  }, [rent?.vehicle?.startAddress, rent?.vehicle?.endAddress]);

  // useEffect(() => {
  //   async function getRentKm() {
  //     if (rent?.movers?.startAddress && rent?.movers?.endAddress) {
  //       const km = await getKmBetweenDistances(
  //         {
  //           lon: rent?.movers?.startAddress?.lng,
  //           lat: rent?.movers?.startAddress?.lat,
  //         },
  //         {
  //           lon: rent?.movers?.endAddress?.lng,
  //           lat: rent?.movers?.endAddress?.lat,
  //         }
  //       );
  //       handleMoversRentByKey("km", km);
  //     }
  //   }
  //   getRentKm();
  // }, [rent?.movers?.startAddress, rent?.movers?.endAddress]);
  //
  // useEffect(() => {
  //   async function getRentKm() {
  //     if (rent?.lift?.startAddress && rent?.lift?.endAddress) {
  //       const km = await getKmBetweenDistances(
  //         {
  //           lon: rent?.lift?.startAddress?.lng,
  //           lat: rent?.lift?.startAddress?.lat,
  //         },
  //         { lon: rent?.lift?.endAddress?.lng, lat: rent?.lift?.endAddress?.lat }
  //       );
  //       handleLiftRentByKey("km", km);
  //     }
  //   }
  //   getRentKm();
  // }, [rent?.lift?.startAddress, rent?.lift?.endAddress]);

  useEffect(() => {
    if (isObjectEmpty(rent)) return; // ici checker toute les parties, sinon tout refaire à chaque fois?
    Cookie.set("rent", JSON.stringify(rent));
  }, [rent]);

  function clearRent() {
    setRent({});
    Cookie.remove("rent");
  }

  return (
    <RentContext.Provider
      value={{
        rent,
        setRent,
        handleVehicleRent,
        handleVehicleRentByKey,
        handleLiftRent,
        handleLiftRentByKey,
        handleWarehouseRent,
        handleWarehouseRentByKey,
        handleMoversRent,
        handleMoversRentByKey,
        clearRent,
        handleRentByKey,
        handlePassageRent,
        handlePassageRentByKey,
      }}
    >
      {children}
    </RentContext.Provider>
  );
};

export const useRent = () => useContext(RentContext);
