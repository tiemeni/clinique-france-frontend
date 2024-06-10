/**
 * @description for praticiens
 */
export const dataPraticien = {
  cols: [
    { label: 'Actions', fname: 'Action' },
    { label: 'civilité', fname: 'civility' },
    { label: 'Nom', fname: 'name' },
    { label: 'Prenom', fname: 'surname' },
    { label: 'Date de naissance', fname: 'birthdate' },
    { label: 'Portable', fname: 'telephone' },
    { label: 'Email', fname: 'email' },
    { label: 'Initiales', fname: 'initiales' },
    { label: 'Actif', fname: 'active' },
    { label: 'Temps par defaut', fname: 'timeSlot' },
    {label: 'job', fname: 'job'}
  ],
  rows: [],
  actions: [
    {
      label: 'modifier',
      action: () => console.log('modifier'),
      editePath: '/content/praticien/upsert/',
    },
    {
      label: 'modifier le mot de passe',
      action: () => console.log('modifier'),
      editePath: '/content/praticien/change-pwd/',
    },
    {
      label: 'supprimer',
      action: (fn) => fn(),
    },
  ],
};

export const dataUSer = {
  cols: [
    { label: 'Actions', fname: 'Action' },
    { label: 'civilité', fname: 'civility' },
    { label: 'Nom', fname: 'name' },
    { label: 'Prenom', fname: 'surname' },
    { label: 'Date de naissance', fname: 'birthdate' },
    { label: 'Portable', fname: 'telephone' },
    { label: 'Email', fname: 'email' },
    { label: 'Initiales', fname: 'initiales' },
    { label: 'Actif', fname: 'active' },
  ],
  rows: [],
  actions: [
    {
      label: 'modifier',
      action: () => console.log('modifier'),
      editePath: '/content/user/upsert/',
    },
    {
      label: 'modifier le mot de passe',
      action: () => console.log('modifier le mot de passe') ,
      editePath: '/content/user/change-pwd/',
    },
    {
      label: 'supprimer',
      action: (fn) => fn(),
    },
  ],
};

export const dataLieux = {
  cols: [
    { label: 'Actions', fname: 'Action' },
    { label: 'Label', fname: 'label' },
    { label: 'Code postal', fname: 'codePostal' },
    { label: 'Region', fname: 'region' },
    { label: 'Ville', fname: 'ville' },
    { label: 'Reference', fname: 'reference' },
    { label: 'initiales', fname: 'initiales' },
    { label: 'Active', fname: 'active' },
  ],
  rows: [],
  actions: [
    {
      label: 'modifier',
      action: () => console.log('modifier'),
      editePath: '/content/lieu/upsert/',
    },
    {
      label: 'supprimer',
      action: (fn) => fn(),
    },
  ],
};

export const dataConsignes = {
  cols: [
    { label: 'Actions', fname: 'Action' },
    { label: 'Label', fname: 'label' },
    { label: 'content', fname: 'content' },
  ],
  rows: [],
  actions: [
    {
      label: 'modifier',
      action: () => console.log('modifier'),
      editePath: '/content/consigne/upsert/',
    },
    {
      label: 'supprimer',
      action: (fn) => fn(),
    },
  ],
};

export const dataMotifs = {
  cols: [
    { label: 'Actions', fname: 'Action' },
    { label: 'Nom', fname: 'nom' },
    { label: 'Temps par defaut', fname: 'default_time' },
    { label: 'Couleur', fname: 'couleur' },
    { label: 'Reference', fname: 'reference' },
    { label: 'Active', fname: 'active' },
  ],
  rows: [],
  actions: [
    {
      label: 'modifier',
      action: () => console.log('modifier'),
      editePath: '/content/motif/upsert/',
    },
    {
      label: 'supprimer',
      action: (fn) => fn(),
    },
  ],
};

export const dataPatient = {
  cols: [
    { label: 'Actions', fname: 'Action' },
    { label: 'civilité', fname: 'civility' },
    { label: 'Nom', fname: 'name' },
    { label: 'Prenom', fname: 'surname' },
    { label: 'Date de naissance', fname: 'birthdate' },
    { label: 'Portable', fname: 'telephone' },
    { label: 'Email', fname: 'email' },
    { label: 'Initiales', fname: 'initiales' },
    { label: 'Actif', fname: 'active' },
    { label: 'Group', fname: 'groups' },
  ],
  rows: [],
  actions: [
    {
      label: 'modifier',
      action: () => console.log('modifier'),
      editePath: '/content/patient/upsert/',
    },
    {
      label: 'modifier le mot de passe',
      action: () => console.log('modifier le mot de passe') ,
      editePath: '/content/patient/change-pwd/',
    },
    {
      label: 'supprimer',
      action: (fn) => fn(),
    },
    
  ],
};

export const dataSpeciality = {
  cols: [
    { label: 'Actions', fname: 'Action' },
    { label: 'Label', fname: 'label' },
    { label: 'Titre', fname: 'title' },
    { label: 'Reference', fname: 'reference' },
    { label: 'Alert pour web', fname: 'webAlert' },
  ],
  rows: [
    {
      label: 'nom spec',
      title: 'titre',
      reference: 'reference',
    },
    {
      label: 'nom spec 2',
      title: 'titre 2',
      reference: 'reference 2',
    },
  ],
  actions: [
    {
      label: 'modifier',
      action: () => console.log('modifier'),
      editePath: '/content/speciality/upsert/',
    },
    {
      label: 'supprimer',
      action: (fn) => fn(),
    },
  ],
};
