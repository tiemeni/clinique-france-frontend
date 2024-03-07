/**
 * praticien formater
 */

import moment from 'moment';


const getFirstPart = (str='') => {
  if (str.length < 20) {
    return str
    
  }
  return (str.substring(0, str.trim().indexOf(' ') + 1) + (str.lastIndexOf(' ') > str.indexOf(' ') && '...' ) )|| str
};

export const pratFormater = (data) => ({
  civility: 'M',
  name: getFirstPart(data.name),
  surname: getFirstPart(data.surname),
  birthdate: moment(data.birthdate).format('DD/MM/YYYY'),
  telephone: data.telephone,
  email: data.email,
  password: data?.password,
  initiales: data.initiales,
  active: data.active ? "OUI" : "NON",
  timeSlot: data.timeSlot,
  job: data.job.title || data.job.label,
  _id: data._id,
});

export const userFormater = (data) => ({
  civility: data?.civility?.label ?? 'M',
  name: getFirstPart(data.name),
  surname: getFirstPart(data.surname),
  birthdate: moment(data.birthdate).format('DD/MM/YYYY'),
  telephone: data.telephone,
  email: data.email,
  password: data.password,
  initiales: data.initiales,
  active: data.active ? "OUI" : "NON",
  _id: data._id,
});

export const patientFormater = (data) => ({
  civility: data?.civility?.label,
  name: getFirstPart(data.name),
  surname: getFirstPart(data.surname),
  birthdate: moment(data.birthdate).format('DD/MM/YYYY'),
  telephone: data.telephone,
  email: data.email,
  initiales: data.initiales,
  active: data.active ? "OUI" : "NON",
  groups: data.groups,
  _id: data._id,
});

export const motifFormater = (data) => ({
  civility: data?.civility?.label,
  nom: data.nom || data.label,
  default_time: data.default_time,
  couleur: data?.couleur,
  reference: data.reference,
  active: data.active ? "OUI" : "NON",
  _id: data._id,
});

export const lieuxFormater = (data) => ({
  active: data.active ? "OUI" : "NON",
  codePostal: data.codePostal,
  initiales: data.initiales,
  label: data.label,
  reference: data.reference,
  region: data.region,
  ville: data.ville,
  _id: data._id,
});
