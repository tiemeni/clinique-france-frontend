export const data = {
  dataFields: {
    callBacks: {
      onUp: (d) => console.log(d),
      onBack: () => console.log('on back'),
    },
    data: [
      {
        name: 'nom',
        placeholder: 'votre nom',
        required: true,
        type: 'text',
        id: 1,
      },
      {
        name: 'email',
        placeholder: 'votre email',
        required: true,
        type: 'email',
        id: 2,
      },
      {
        name: 'civilité',
        placeholder: 'votre civilité',
        required: true,
        type: 'picklist',
        id: 3,
        options: [
          {
            name: 'option1',
            label: 'option1',
            _id: 1,
          },
          {
            name: 'option2',
            label: 'option2',
            _id: 2,
          },
        ],
      },
      {
        name: 'color',
        placeholder: 'votre color',
        required: true,
        type: 'colorPicker',
        id: 4,
      },
      {
        name: 'preferences',
        placeholder: 'votre preferences',
        required: true,
        type: 'checkbox',
        id: 5,
        options: [
          {
            name: 'preference1',
            id: 1,
          },
          {
            name: 'preference2',
            id: 2,
          },
        ],
      },
      {
        name: 'sexe',
        placeholder: 'votre sexe',
        required: true,
        type: 'radio',
        id: 6,
        options: [
          {
            name: 'Masculin',
            value: 1,
            id: 1,
          },
          {
            name: 'Feminin',
            value: 0,
            id: 2,
          },
        ],
      },
      {
        name: 'number',
        placeholder: 'votre numero',
        required: true,
        type: 'number',
        id: 7,
      },
    ],
  },
};

/**
 * @description recherche sur praticien
 */

export const praticien = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log('====>  ',d),
        label: 'Rechercher',
        color: '#04B7C9',
      },
      onBack: {
        action: () => console.log('on back'),
        label: 'Annuler',
        color: 'red',
      },
    },
    data: [
      {
        name: 'nom',
        placeholder: 'Prenom',
        required: true,
        type: 'text',
        id: 1,
      },
      // {
      //   name: 'surname',
      //   placeholder: 'Prenom',
      //   required: false,
      //   type: 'text',
      //   id: 2,
      // },
      {
        name: 'email',
        placeholder: 'E-mail',
        required: false,
        type: 'email',
        id: 2,
      },
      // {
      //   name: 'civility',
      //   placeholder: 'Civilité',
      //   required: false,
      //   type: 'picklist',
      //   id: 3,
      //   options: [
      //     {
      //       name: 'option1',
      //       label: 'option1',
      //       _id: 1,
      //     },
      //     {
      //       name: 'option2',
      //       label: 'option2',
      //       _id: 2,
      //     },
      //   ],
      // },
    ],
  },
};

export const utilisateur = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log(d),
        label: 'Rechercher',
        color: '#04B7C9',
      },
      onBack: {
        action: (fn) => fn,
        label: 'Annuler',
        color: 'red',
      },
    },
    data: [
      {
        name: 'nom',
        placeholder: 'Prenom',
        required: true,
        type: 'text',
        id: 1,
      },
      // {
      //   name: 'surname',
      //   placeholder: 'Prenom',
      //   required: false,
      //   type: 'text',
      //   id: 2,
      // },
      {
        name: 'email',
        placeholder: 'E-mail',
        required: false,
        type: 'email',
        id: 2,
      },
      // {
      //   name: 'civility',
      //   placeholder: 'Civilité',
      //   required: false,
      //   type: 'picklist',
      //   id: 3,
      //   options: [
      //     {
      //       name: 'option1',
      //       label: 'option1',
      //       _id: 1,
      //     },
      //     {
      //       name: 'option2',
      //       label: 'option2',
      //       _id: 2,
      //     },
      //   ],
      // },
    ],
  },
};

export const speciality = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log(d),
        label: 'Rechercher',
        color: '#04B7C9',
      },
      onBack: {
        action: () => console.log('on back'),
        label: 'Annuler',
        color: 'red',
      },
    },
    data: [
      // {
      //   name: 'label',
      //   placeholder: 'Label',
      //   required: true,
      //   type: 'text',
      //   id: 1,
      // },
      {
        name: 'title',
        placeholder: 'Title',
        required: false,
        type: 'text',
        id: 2,
      },
      {
        name: 'webAlert',
        placeholder: 'Alert pour web',
        required: false,
        type: 'text',
        id: 3,
      },
    ],
  },
};

export const lieu = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log(d),
        label: 'Rechercher',
        color: '#04B7C9',
      },
      onBack: {
        action: () => console.log('on back'),
        label: 'Annuler',
        color: 'red',
      },
    },
    data: [
      {
        name: 'label',
        placeholder: 'Label',
        required: true,
        type: 'text',
        id: 1,
      },
      {
        name: 'codePostal',
        placeholder: 'Code postal',
        required: false,
        type: 'text',
        id: 2,
      },
      {
        name: 'region',
        placeholder: 'Region',
        required: false,
        type: 'picklist',
        id: 3,
        options: [
          {
            label: 'Yaoundé',
            name: 'Yaoundé',
            _id: 1,
          },
          {
            label: 'Douala',
            name: 'Douala',
            _id: 2,
          },
        ],
      },
      {
        name: 'ville',
        placeholder: 'Ville',
        required: false,
        type: 'picklist',
        id: 4,
        options: [
          {
            label: 'ville 1',
            name: 'ville 1',
            _id: 1,
          },
          {
            label: 'ville 2',
            name: 'ville 2',
            _id: 2,
          },
        ],
      },
    ],
  },
};

export const consigne = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log(d),
        label: 'Rechercher',
        color: '#04B7C9',
      },
      onBack: {
        action: () => console.log('on back'),
        label: 'Annuler',
        color: 'red',
      },
    },
    data: [
      {
        name: 'label',
        placeholder: 'Label',
        required: true,
        type: 'text',
        id: 1,
      },
    ],
  },
};


export const motif = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log('==== > ' ,d),
        label: 'Rechercher',
        color: '#04B7C9',
      },
      onBack: {
        action: () => console.log('on back'),
        label: 'Annuler',
        color: 'red',
      },
    },
    data: [
      {
        name: 'nom',
        placeholder: 'nom',
        required: true,
        type: 'text',
        id: 1,
      },
      {
        name: 'couleur',
        placeholder: 'couleur',
        required: false,
        type: 'text',
        id: 2,
      },
      // {
      //   name: 'reference',
      //   placeholder: 'Reference',
      //   required: false,
      //   type: 'text',
      //   id: 3,
      // },
    ],
  },
};

/**
 * @description formilaire creation / update praticien
 */

export const praticienCreateOrEdite = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log(d),
        label: 'Enregistrer',
        color: '#04B7C9',
      },
      onBack: {
        action: () => window.history.back(),
        label: 'Retour',
        color: 'red',
      },
    },
    data: [
      {
        name: 'civility',
        placeholder: 'civilité',
        required: true,
        type: 'picklist',
        id: 3,
        options: [
          {
            name: 'option1',
            label: 'option1',
            _id: 1,
          },
          {
            name: 'option2',
            label: 'option2',
            _id: 2,
          },
        ],
      },
      {
        name: 'name',
        placeholder: 'Nom',
        required: true,
        type: 'text',
        id: 1,
      },
      {
        name: 'surname',
        placeholder: 'Prenom',
        required: true,
        type: 'text',
        id: 2,
      },
      {
        name: 'birthdate',
        placeholder: 'date de naissance',
        required: true,
        type: 'date',
        id: 4,
      },
      {
        name: 'telephone',
        placeholder: 'portable',
        required: true,
        type: 'number',
        id: 5,
      },
      {
        name: 'email',
        placeholder: 'email',
        required: true,
        type: 'email',
        id: 6,
      },
      {
        name: 'password',
        placeholder: 'Mot de passe',
        required: true,
        type: 'password',
        id: 30,
      },
      {
        name: 'initiales',
        placeholder: 'initiales',
        required: false,
        type: 'text',
        id: 7,
      },
      {
        name: 'active',
        placeholder: 'actif',
        required: false,
        type: 'picklist',
        id: 8,
        options: [
          {
            label: 'true',
            name: 'true',
            _id: 1,
          },
          {
            label: 'false',
            name: 'false',
            _id: 2,
          },
        ],
      },
      {
        name: 'groups',
        placeholder: 'group',
        required: false,
        type: 'picklist',
        id: 9,
        options: [
          {
            label: 'grpe 1',
            name: 'grpe 1',
            _id: 1,
          },
          {
            label: 'grpe 2',
            name: 'grpe 2',
            _id: 2,
          },
        ],
      },
      // {
      //   name: 'affectation',
      //   placeholder: 'affectation',
      //   required: false,
      //   type: 'picklist',
      //   id: 10,
      //   options: [
      //     {
      //       _id: 1,
      //       name: 'affectation 1',
      //       label: 'affectation 1',
      //     },
      //     {
      //       _id: 2,
      //       name: 'affectation 2',
      //       label: 'affectation 2',
      //     },
      //   ],
      // },
      {
        name: 'job',
        placeholder: 'job',
        required: true,
        type: 'picklist',
        id: 11,
        options: [
          {
            _id: 1,
            name: 'job 1',
            label: 'job 1',
          },
          {
            _id: 2,
            name: 'job 2',
            label: 'job2',
          },
        ],
      },
      {
        name: 'motifFilter',
        placeholder: 'filtres sur les motifs',
        required: false,
        type: 'picklist',
        id: 12,
        options: [
          {
            _id: 1,
            name: 'motifFilter 1',
            label: 'motifFilter 1',
          },
          {
            _id: 2,
            name: 'motifFilter 2',
            label: 'motifFilter 2',
          },
        ],
      },
      {
        name: 'timeSlot',
        placeholder: 'durée de traitement',
        required: true,
        type: 'picklist',
        id: 13,
        options: [
          {
            _id: 1,
            name: '15',
            label: '15',
          },
          {
            _id: 2,
            name: '20',
            label: '20',
          },
          {
            _id: 3,
            name: '25',
            label: '25',
          },
          {
            _id: 4,
            name: '30',
            label: '30',
          },
          {
            _id: 5,
            name: '35',
            label: '35',
          },
          {
            _id: 6,
            name: '40',
            label: '40',
          },
        ],
      },
    ],
  },
};

/**
 * @description user create or edite
 */

export const userCreateOrEdite = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log(d),
        label: 'Enregistrer',
        color: '#04B7C9',
      },
      onBack: {
        action: () => window.history.back(),
        label: 'Retour',
        color: 'red',
      },
    },
    data: [
      {
        name: 'civility',
        placeholder: 'civilité',
        required: true,
        type: 'picklist',
        id: 3,
        options: [
          {
            name: 'option1',
            label: 'option1',
            _id: 1,
          },
          {
            name: 'option2',
            label: 'option2',
            _id: 2,
          },
        ],
      },
      {
        name: 'name',
        placeholder: 'Nom',
        required: true,
        type: 'text',
        id: 1,
      },
      {
        name: 'surname',
        placeholder: 'Prenom',
        required: true,
        type: 'text',
        id: 2,
      },
      {
        name: 'birthdate',
        placeholder: 'Date de naissance',
        required: false,
        type: 'date',
        id: 4,
      },
      {
        name: 'telephone',
        placeholder: 'Portable',
        required: false,
        type: 'number',
        id: 5,
      },
      {
        name: 'email',
        placeholder: 'Email',
        required: true,
        type: 'email',
        id: 6,
      },
      {
        name: 'password',
        placeholder: 'Mot de passe',
        required: true,
        type: 'password',
        id: 30,
      },
      {
        name: 'initiales',
        placeholder: 'initiales',
        required: false,
        type: 'text',
        id: 7,
      },
      {
        name: 'active',
        placeholder: 'Actif',
        required: false,
        type: 'picklist',
        id: 8,
        options: [
          {
            label: 'true',
            name: 'true',
            _id: 1,
          },
          {
            label: 'false',
            name: 'false',
            _id: 2,
          },
        ],
      },
      {
        name: 'groups',
        placeholder: 'group',
        required: false,
        type: 'picklist',
        id: 9,
        options: [
          {
            label: 'grpe 1',
            name: 'grpe 1',
            _id: 1,
          },
          {
            label: 'grpe 2',
            name: 'grpe 2',
            _id: 2,
          },
        ],
      },
    ],
  },
};

/**
 * @description fiche patient
 */

export const patientCreateOrEdite = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log(d),
        label: 'Enregistrer',
        color: '#04B7C9',
      },
      onBack: {
        action: () => window.history.back(),
        label: 'Retour',
        color: 'red',
      },
    },
    data: [
      {
        name: 'civility',
        placeholder: 'civilité',
        required: true,
        type: 'picklist',
        id: 3,
        options: [
          {
            name: 'option1',
            label: 'option1',
            _id: 1,
          },
          {
            name: 'option2',
            label: 'option2',
            _id: 2,
          },
        ],
      },
      {
        name: 'name',
        placeholder: 'Nom',
        required: true,
        type: 'text',
        id: 1,
      },
      {
        name: 'surname',
        placeholder: 'Prenom',
        required: true,
        type: 'text',
        id: 2,
      },
      {
        name: 'birthdate',
        placeholder: 'date de naissance',
        required: false,
        type: 'date',
        id: 4,
      },
      {
        name: 'telephone',
        placeholder: 'portable',
        required: false,
        type: 'number',
        id: 5,
      },
      {
        name: 'email',
        placeholder: 'email',
        required: true,
        type: 'email',
        id: 6,
      },
      {
        name: 'initiales',
        placeholder: 'initiales',
        required: false,
        type: 'text',
        id: 7,
      },
      {
        name: 'active',
        placeholder: 'actif',
        required: false,
        type: 'picklist',
        id: 8,
        options: [
          {
            label: 'true',
            name: 'true',
            _id: 1,
          },
          {
            label: 'false',
            name: 'false',
            _id: 2,
          },
        ],
      },
    ],
  },
};

/**
 * @description upsert sur speciality
 */

export const upsertSpeciality = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log(d),
        label: 'Enregistrer',
        color: '#04B7C9',
      },
      onBack: {
        action: () => window.history.back(),
        label: 'Retour',
        color: 'red',
      },
    },
    data: [
      {
        name: 'label',
        placeholder: 'Label',
        required: true,
        type: 'text',
        id: 1,
      },
      {
        name: 'title',
        placeholder: 'Titre',
        required: false,
        type: 'text',
        id: 2,
      },
      {
        name: 'reference',
        placeholder: 'Reference',
        required: false,
        type: 'text',
        id: 5,
      },
      {
        name: 'webAlert',
        placeholder: 'Alert pour web',
        required: false,
        type: 'text',
        id: 3,
      },
      {
        name: 'secretaryAlert',
        placeholder: 'Alert pour Secretaire',
        required: false,
        type: 'text',
        id: 4,
      },
    ],
  },
};

/**
 * @description upsert sur motifs
 */

export const upsertMotifs = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log(d),
        label: 'Enregistrer',
        color: '#04B7C9',
      },
      onBack: {
        action: () => window.history.back(),
        label: 'Retour',
        color: 'red',
      },
    },
    data: [
      {
        name: 'label',
        placeholder: 'Label',
        required: true,
        type: 'text',
        id: 1,
      },
      {
        name: 'nom',
        placeholder: 'Nom',
        required: false,
        type: 'text',
        id: 2,
      },
      {
        name: 'default_time',
        placeholder: 'Temps par defaut du motif',
        required: true,
        type: 'picklist',
        id: 3,
        options: [
          {
            label: '10',
            name: '10',
            _id: 1,
          },
          {
            label: '15',
            name: '15',
            _id: 2,
          },
          {
            label: '20',
            name: '20',
            _id: 3,
          },
          {
            label: '25',
            name: '25',
            _id: 4,
          },
          {
            label: '30',
            name: '30',
            _id: 5,
          },
        ],
      },
      {
        name: 'reference',
        placeholder: 'reference',
        required: false,
        type: 'text',
        id: 4,
      },
      {
        name: 'couleur',
        placeholder: 'couleur',
        required: true,
        type: 'couleur',
        id: 20,
      },
      {
        name: 'idConsigne',
        placeholder: 'consigne(s) liée(s)',
        required: false,
        type: 'multiselect',
        id: 10,
        options: [],
      },
      {
        name: 'idSpeciality',
        placeholder: 'Specialité liée',
        required: true,
        type: 'picklist',
        id: 11,
        options: [],
      },
      {
        name: 'active',
        placeholder: 'actif',
        required: false,
        type: 'picklist',
        id: 8,
        options: [
          {
            label: 'true',
            name: 'true',
            _id: 1,
          },
          {
            label: 'false',
            name: 'false',
            _id: 2,
          },
        ],
      },
    ],
  },
};

/**
 * @description upsert sur speciality
 */

export const upsertLieux = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log(d),
        label: 'Enregistrer',
        color: '#04B7C9',
      },
      onBack: {
        action: () => window.history.back(),
        label: 'Retour',
        color: 'red',
      },
    },
    data: [
      {
        name: 'label',
        placeholder: 'Label',
        required: true,
        type: 'text',
        id: 1,
      },
      {
        name: 'region',
        placeholder: 'Region',
        required: true,
        type: 'picklist',
        id: 3,
        options: [
          {
            label: 'Yaoundé',
            name: 'Yaoundé',
            _id: 1,
          },
          {
            label: 'Douala',
            name: 'Douala',
            _id: 2,
          },
        ],
      },
      {
        name: 'ville',
        placeholder: 'Ville',
        required: true,
        type: 'picklist',
        id: 4,
        options: [
          {
            label: 'ville 1',
            name: 'ville 1',
            _id: 1,
          },
          {
            label: 'ville 2',
            name: 'ville 2',
            _id: 2,
          },
        ],
      },
      {
        name: 'codePostal',
        placeholder: 'Code Postal',
        required: false,
        type: 'text',
        id: 5,
      },
      {
        name: 'reference',
        placeholder: 'reference',
        required: true,
        type: 'text',
        id: 6,
      },
      {
        name: 'initiales',
        placeholder: 'initiales',
        required: false,
        type: 'text',
        id: 7,
      },
      {
        name: 'longitude',
        placeholder: 'Longitude',
        required: false,
        type: 'number',
        id: 8,
      },
      {
        name: 'latitude',
        placeholder: 'Latitude',
        required: false,
        type: 'number',
        id: 9,
      },
      {
        name: 'active',
        placeholder: 'Actif',
        required: false,
        type: 'picklist',
        id: 10,
        options: [
          {
            label: 'true',
            name: 'true',
            _id: 1,
          },
          {
            label: 'false',
            name: 'false',
            _id: 2,
          },
        ],
      },
    ],
  },
};

/**
 * @description data for consignes
 */

export const upsertConsigne = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log(d),
        label: 'Enregistrer',
        color: '#04B7C9',
      },
      onBack: {
        action: () => window.history.back(),
        label: 'Retour',
        color: 'red',
      },
    },
    data: [
      {
        name: 'label',
        placeholder: 'Label',
        required: true,
        type: 'text',
        id: 1,
      },
      {
        name: 'content',
        placeholder: 'contenu',
        required: true,
        type: 'textarea',
        id: 3,
      },
    ],
  },
};

/**
 * @description upsert sur structure
 */

export const upsertStructure = {
  dataFields: {
    callBacks: {
      onUp: {
        action: (d) => console.log(d),
        label: 'Enregistrer',
        color: '#04B7C9',
      },
      onBack: {
        action: () => {
          window.location = '/content/';
        },
        label: 'Retour',
        color: 'red',
      },
    },
    data: [
      {
        name: 'nom',
        placeholder: 'Nom de la structure',
        required: true,
        type: 'text',
        id: 1,
      },
      {
        name: 'typeCentre',
        placeholder: 'Type de cabinet',
        required: true,
        type: 'text',
        id: 2,
      },
      {
        name: 'addresse',
        placeholder: 'Adresse ',
        required: true,
        type: 'text',
        id: 3,
      },
      {
        name: 'email',
        placeholder: 'E-mail',
        required: true,
        type: 'email',
        id: 4,
      },
      {
        name: 'telephone',
        placeholder: 'Telephone',
        required: true,
        type: 'number',
        id: 5,
      },
      {
        name: 'raisonSocial',
        placeholder: 'Raison sociale',
        required: true,
        type: 'text',
        id: 6,
      },
      {
        name: 'longitude',
        placeholder: 'Longitude',
        required: true,
        type: 'number',
        id: 7,
      },
      {
        name: 'latitude',
        placeholder: 'Latitude',
        required: true,
        type: 'number',
        id: 8,
      },
    ],
  },
};
