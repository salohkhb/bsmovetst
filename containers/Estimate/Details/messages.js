export default {
  sections: {
    details: {
      movingDate: "Date de votre déménagement",
      description:
        "Vous êtes sur le point de commencer votre demande de devis pour un déménagement. La première étape consiste à nous fournir des informations concernant votre point de départ et votre destination, ainsi que des informations concernant le déménagement pour nous permettre de vous proposer un service optimal.",
      departure: {
        title: "Départ",
        input: {
          name: "address",
          label: "Adresse de départ",
          placeholder: "Entrer votre adresse complète",
        },
        parkingPermit: {
          name: "parkingPermit",
          text: "Avez-vous besoin d’une autorisation de stationnement ?",
        },
      },
      arrival: {
        title: "Arrivée",
        input: {
          name: "address",
          label: "Adresse d'arrivé",
          placeholder: "Entrer votre adresse complète",
        },
        parkingPermit: {
          name: "parkingPermit",
          text: "Avez-vous besoin d’une autorisation de stationnement ?",
        },
      },
      noAddress: "Aucune addresse trouvée",
    },
  },
  radio: {
    arrivalDateInformations: {
      name: "arrivalDateInformations",
      label: "",
      fixe: "Date fixe",
      flexible: "Date flexible",
    },
    departureInformations: {
      name: "parkingPermit",
      label: "",
      no: "Non",
      yes: "Oui",
    },
    arrivalInformations: {
      name: "parkingPermit",
      label: "",
      no: "Non",
      yes: "Oui",
    },
  },
  selects: {
    floor: {
      name: "floor",
      label: "Etages",
      ground: "0",
      first: "1",
      second: "2",
      third: "3",
      fourth: "4",
      fifth: "5",
    },
    elevator: {
      name: "elevator",
      label: "Ascenseur",
      one_to_two: "1 à 2 personnes",
      three_to_four: "3 à 4 personnes",
      five_to_six: "5 à 6 personnes",
      more: "6 et plus",
      no: "Non",
    },
    footDistance: {
      name: "footDistance",
      label: "Portage",
      elevenToTwenty: "Jusqu 'à 20 mètres",
      twentyOneToThirty: "Entre 21 et 30 mètres",
      thirtyOneToFourty: "Entre 31 et 40 mètres",
      fourtyOneToFifty: "Entre 41 et 50 mètres",
      moreThanFifty: "Plus de 50 mètres",
    },
    furnituresLift: {
      name: "furnituresLift",
      label: "Monte-meuble",
      yes: "Oui",
      no: "Non",
    },
  },
};
