import messages from "./messages";

export const CURRENCY = {
  EUR: "€",
  DOLL: "$",
};

export const METRICS = {
  CUBE: "m³",
  CENTIMETER_CUBE: "cm³",
};

export const ALERT = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFOS: "info",
};

export const mockCustomer = {
  email: "test@test.fr",
  address: {
    street: "10 rue des Champs Elysées",
    city: "Paris",
    zipCode: "75008",
    country: "France",
  },
  firstName: "PrénomTest",
  lastName: "NomTest",
  phoneNumber: "0666666666",
  birthDate: "02/02/02",
};

export const DELIVERY_MODES = [
  { name: "chronopost", messages: messages.deliveryMode.chronopost, value: 0 },
];

export const NAV_HEADER_FURNITURES_BUY_STEPS = [
  messages.furnituresBuySteps.firstStep,
  messages.furnituresBuySteps.secondStep,
  messages.furnituresBuySteps.thirdStep,
];

export const NAV_HEADER_ESTIMATE_STEPS = [
  messages.estimateSteps.firstStep,
  messages.estimateSteps.secondStep,
  messages.estimateSteps.thirdStep,
];

export const NAV_HEADER_VEHICLE_RENT_STEPS = [
  "Renseignements",
  "Choix du véhicule",
  "Réservation",
];

export const NAV_HEADER_LIFT_RENT_STEPS = [
  "Renseignements",
  "Choix du monte-meubles",
  "Réservation",
];

export const NAV_HEADER_MOVERS_RENT_STEPS = ["Renseignements", "Réservation"];

export const PASSAGE_DURATION = 1;
export const HALF_DAY_DURATION = 4;
export const FULL_DAY_DURATION = 8;

export const VEHICLE_LIST = [
  {
    id: 1,
    name: "Camion dimensions intérieur d’un utilitaire 5m3",
    price: 0,
    volume: 5,
    src: "/images/5.png",
  },
  {
    id: 2,
    name: "Camion dimensions intérieur d’un utilitaire 12m3",
    price: 0,
    volume: 12,
    src: "/images/12.png",
  },
  {
    id: 3,
    name: "Camion dimensions intérieur d’un utilitaire 22m3",
    price: 0,
    volume: 22,
    src: "/images/22.png",
  },
  {
    id: 4,
    name: "Camion dimensions intérieur d’un utilitaire 32m3",
    price: 0,
    volume: 32,
    src: "/images/32.png",
  },
  {
    id: 5,
    name: "Camion dimensions intérieur d’un utilitaire 42m3",
    price: 0,
    volume: 42,
    src: "/images/42.png",
  },
  {
    id: 6,
    name: "Camion dimensions intérieur d’un utilitaire 50m3",
    price: 0,
    volume: 50,
    src: "/images/50.png",
  },
  {
    id: 7,
    name: "Camion dimensions intérieur d’un utilitaire 60m3",
    price: 0,
    volume: 60,
    src: "/images/60.png",
  },
  {
    id: 8,
    name: "Camion dimensions intérieur d’un utilitaire 100m3",
    price: 0,
    volume: 100,
    src: "/images/100.png",
  },
];
