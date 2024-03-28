export default {
  faq: {
    title: "Questions posées fréquemment",
    firstSection: {
      title:
        "En tant que gendarme, comment puis-je estimer le coût de mon déménagement ?",
      content:
        "En tant que gendarme, vous pouvez estimer le coût de votre déménagement en utilisant notre calculateur de prix et de volume. Entrez simplement les détails de votre déménagement, tels que la distance, le volume des biens à déménager et les services supplémentaires nécessaires, pour obtenir une estimation précise.",
    },
    secondSection: {
      title: "Comment calculer mon volume de déménagement ?",
      content:
        "Pour calculer le volume de votre déménagement, vous pouvez mesurer les dimensions de vos meubles et cartons, puis les multiplier pour obtenir le volume total. Vous pouvez également utiliser notre outil de calcul en ligne, où vous entrez les informations sur vos biens et il vous donne une estimation du volume.",
    },
    thirdSection: {
      title:
        "Comment obtenir un devis pour mon déménagement ?",
      content:
        "Pour obtenir un devis précis pour votre déménagement, il vous suffit de remplir notre formulaire en ligne avec les détails de votre déménagement, tels que les adresses de départ et d’arrivée, la date souhaitée, le volume estimé, etc. Notre équipe vous fournira ensuite un devis détaillé gratuitement.",
    },
    fourthSection: {
      title: "Combien de temps avant la réservation dois-je planifier mon déménagement ?",
      content:
        "Il est recommandé de planifier votre déménagement dès que possible, surtout si vous prévoyez de déménager pendant la haute saison. En général, il est conseillé de réserver votre déménagement au moins quelques semaines à l’avance pour vous assurer d’avoir la date et les services souhaités.",
    },
  },
  sections: {
    details: {
      movingDate: "Choisir la date de votre déménagement",
      description:
        "Vous êtes sur le point de commencer votre demande de devis pour un déménagement. La première étape consiste à nous fournir des informations concernant votre point de départ et votre destination, ainsi que des informations concernant le déménagement pour nous permettre de vous proposer un service optimal. Pour vous assurer une estimation précise, veuillez remplir le formulaire ci-dessous en indiquant tous les détails pertinents tels que la date prévue du déménagement, le type de biens à transporter et toute autre demande spécifique que vous pourriez avoir.",
      departure: {
        title: "Adresse de départ",
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
        title: "Adresse d'arrivé",
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
