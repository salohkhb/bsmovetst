export default {
  alert: {
    error: {
      missingValues: 'Merci de renseigner tout les champs.',
      missingEmail: 'Merci de fournir un mail valide',
      missingPassword: 'Merci de fournir un mot de passe valide',
      technicalError: 'Une erreur technique est survenue, merci de contacter le support technique.',
    },
    success: 'Votre demande d\'inscription a été prise en compte. Vous allez recevoir un email pour la confirmation de votre compte.'
  },
  form: {
    error: {
      required: 'Champs requis.',
    },
    email: {
      error: 'Email mal formaté.',
    },
    lastName: {
      error: 'Nom mal formaté.',
    },
    firstName: {
      error: 'Prénom mal formaté.',
    },
    password: {
      error: 'Le mot de passe doit au moins contenir 8 caractères.',
    },
    phoneNumber: {
      error: 'Numéro de téléphone mal formaté.'
    },
    zipCode: {
      error: 'Le code postal est invalide.'
    },
    cgu: {
      error: 'Merci d\'accepter les CGU avant de continuer.'
    },
  },
  inputs: {
    email: {
      name: 'email',
      label: 'Adresse mail',
      placeholder: 'Ex: jeandupond@hotmail.fr',
    },
    lastName: {
      name: 'lastName',
      label: 'Nom',
      placeholder: 'Dupond',
    },
    firstName: {
      name: 'firstName',
      label: 'Prénom',
      placeholder: 'Jean',
    },
    password: {
      name: 'password',
      label: 'Mot de passe',
      placeholder: '********',
    },
    phoneNumber: {
      name: 'phoneNumber',
      label: 'Téléphone',
      placeholder: '06.45.34.56.34',
    },
    address: {
      title: 'Adresse de livraison',
      street: {
        name: 'address.street',
        label: 'Rue',
        placeholder: '1 Avenue des Champs-Élysées'
      },
      zipCode: {
        name: 'address.zipCode',
        label: 'Code postal',
        placeholder: '75008',
      },
      city: {
        name: 'address.city',
        label: 'Ville',
        placeholder: 'Paris'
      },
      country: {
        name: 'address.country',
        label: 'Pays',
        placeholder: 'France'
      },
    }
  },
  cgu: {
    content: 'J\'accepte les ',
    link: 'Conditions générales d\'utilisation',
  },
  button: {
    submit: {
      label: 'Créer mon compte',
    },
  },
  login: {
    content: 'Vous avez déjà un compte? ',
    link: 'Connectez-vous',
  },
};
