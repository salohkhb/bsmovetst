import {
    createContext,
    useContext, useEffect,
    useState,
} from 'react';
import {isObjectEmpty} from "../helpers/functions";
import Cookie from "js-cookie";
import {useEstimate} from "./estimate";

const RentContext = createContext({});

export const RentProvider = ({ children, initialValue }) => {
    const [rent, setRent] = useState( initialValue ? JSON.parse(initialValue) : {});
    const { getKmBetweenDistances } = useEstimate()

    function handleVehicleRent(values) {
        setRent((previousRent) => ({
            ...previousRent,
            vehicle: values,
        }))
    }

    function handleLiftRent(values) {
        setRent((previousRent) => ({
            ...previousRent,
            lift: values,
        }))
    }

    function handleWarehouseRent(values) {
        setRent((previousRent) => ({
            ...previousRent,
            warehouse: values,
        }))
    }

    function handleMoversRent(values) {
        setRent((previousRent) => ({
            ...previousRent,
            movers: values,
        }))
    }

    function handleMoversRentByKey(key, value) {
        setRent((previousRent) => ({
            ...previousRent,
            movers: {
                ...previousRent.movers,
                [key]: value,
            },
        }))
    }

    function handleLiftRentByKey(key, value) {
        setRent((previousRent) => ({
            ...previousRent,
            lift: {
                ...previousRent.lift,
                [key]: value,
            },
        }))
    }

    function handleWarehouseRentByKey(key, value) {
        setRent((previousRent) => ({
            ...previousRent,
            warehouse: {
                ...previousRent.warehouse,
                [key]: value,
            },
        }))
    }

    function handleVehicleRentByKey(key, value) {
        setRent((previousRent) => ({
            ...previousRent,
            vehicle: {
                ...previousRent.vehicle,
                [key]: value,
            },
        }))
    }

    useEffect(() => {
        async function getRentKm() {
            if (rent?.vehicle?.startAddress && rent?.vehicle?.endAddress) {
                const km = await getKmBetweenDistances(
                    { lon: rent?.vehicle?.startAddress?.lng, lat: rent?.vehicle?.startAddress?.lat },
                    { lon: rent?.vehicle?.endAddress?.lng, lat: rent?.vehicle?.endAddress?.lat },
                )
                handleVehicleRentByKey('km', km)
            }
        }
        getRentKm()
    }, [rent?.vehicle?.startAddress, rent?.vehicle?.endAddress])

    useEffect(() => {
        async function getRentKm() {
            if (rent?.movers?.startAddress && rent?.movers?.endAddress) {
                const km = await getKmBetweenDistances(
                    { lon: rent?.movers?.startAddress?.lng, lat: rent?.movers?.startAddress?.lat },
                    { lon: rent?.movers?.endAddress?.lng, lat: rent?.movers?.endAddress?.lat },
                )
                handleMoversRentByKey('km', km)
            }
        }
        getRentKm()
    }, [rent?.movers?.startAddress, rent?.movers?.endAddress])

    useEffect(() => {
        async function getRentKm() {
            if (rent?.lift?.startAddress && rent?.lift?.endAddress) {
                const km = await getKmBetweenDistances(
                    { lon: rent?.lift?.startAddress?.lng, lat: rent?.lift?.startAddress?.lat },
                    { lon: rent?.lift?.endAddress?.lng, lat: rent?.lift?.endAddress?.lat },
                )
                handleLiftRentByKey('km', km)
            }
        }
        getRentKm()
    }, [rent?.lift?.startAddress, rent?.lift?.endAddress])

    useEffect(() => {
        if (isObjectEmpty(rent)) return; // ici checker toute les parties, sinon tout refaire à chaque fois?
        Cookie.set("rent", JSON.stringify(rent));
    }, [rent]);

    function clearRent() {
        setRent({});
        Cookie.remove("rent");
    }

    return (
        <RentContext.Provider value={{
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
        }}
        >
            {children}
        </RentContext.Provider>
    );
};

export const useRent = () => useContext(RentContext);
