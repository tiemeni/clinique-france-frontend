const generateRandomAppointments = () => {
  const startDate = new Date(); // Date de début : aujourd'hui
  startDate.setHours(0, 0, 0, 0); // Réinitialiser l'heure à 00:00:00

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6); // Ajouter 6 jours pour obtenir la fin de la semaine

  const appointments = [];

  const colors = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFA500',
  ];

  // Générer au moins 15 rendez-vous de 10 minutes pour chaque jour de la semaine
  for (let day = 0; day <= 6; day += 1) {
    const dayAppointments = [];

    while (dayAppointments.length < 15) {
      const startDateTime = new Date(startDate);
      startDateTime.setDate(startDate.getDate() + day);
      startDateTime.setHours(8 + Math.floor(Math.random() * 9)); // Heure aléatoire entre 8h et 16h
      startDateTime.setMinutes(Math.floor(Math.random() * 6) * 10); // Minutes : 0, 10, 20, 30, 40, 50

      const endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(startDateTime.getMinutes() + 10); // Durée fixe de 10 minutes

      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const appointment = {
        id: dayAppointments.length + 1,
        title: `Rendez-vous ${dayAppointments.length + 1}`,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        description: 'Ceci est un événement important',
        heure_debut: startDateTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        civ: 'M.',
        borderColor: '#04B7C9',
        color: '#04B7C9',
        textColor: 'black',
        className: 'calendar-event',
        bgColor: randomColor,
      };

      dayAppointments.push(appointment);
    }

    appointments.push(...dayAppointments);
  }

  return appointments;
};
export const fakeDatas = generateRandomAppointments();

export const retreiveIdc = () => {
  const idc = window.location.search.split('idc=')[1];
  return idc;
};

export const formatUserName = (username, userSurname) => {
  const [firstName, secondName] = username.split(' ');
  const [firstSurname, secondSurname] = userSurname.split(' ');
  let final = '';

  if (firstName) {
    final = firstName.toUpperCase();
    if (secondName) {
      final += ` ${secondName.toUpperCase()}`;
    }
  }

  if (firstSurname) {
    final += ` ${firstSurname}`;
    if (secondSurname && !secondName) {
      final += ` ${secondSurname}`;
    }
  }

  return final;
};

export const incrementTime = (start, duration) => {
  // Convertir l'heure de départ en minutes
  const startHour = parseInt(start.split(':')[0], 10);
  const startMinute = parseInt(start.split(':')[1], 10);
  const totalStartMinutes = startHour * 60 + startMinute;

  // Ajouter la durée en minutes
  const totalEndMinutes = totalStartMinutes + parseInt(duration, 10);

  // Calculer l'heure d'arrivée
  const endHour = Math.floor(totalEndMinutes / 60);
  const endMinute = totalEndMinutes % 60;

  // Formater l'heure d'arrivée
  const formattedEndHour = endHour.toString().padStart(2, '0');
  const formattedEndMinute = endMinute.toString().padStart(2, '0');

  // Retourner l'heure d'arrivée au format hh:mm
  return `${formattedEndHour}:${formattedEndMinute}`;
};

export const convertNumberToRegion = (region) => {
  let result;
  switch (region) {
    case '1':
      result = 'centre';
      break;
    case '2':
      result = 'garoua';
      break;
    default:
      break;
  }
  return result;
};

export const convertNumberToVille = (region) => {
  let result;
  switch (region) {
    case '1':
      result = 'yaounde';
      break;
    case '2':
      result = 'douala';
      break;
    default:
      break;
  }
  return result;
};

export const convertIndexIntoNumber = (index) => 5 * index + 5;

export const ajouterDuree = (date, duree) => {
  const [heure, minute] = date.split(":");
  const dureeEnMinutes = parseInt(duree, 10);

  let nouvelleHeure = parseInt(heure, 10);
  let nouveauMinute = parseInt(minute, 10) + dureeEnMinutes;

  // Gérer le dépassement de 60 minutes
  if (nouveauMinute >= 60) {
    const heuresSupplementaires = Math.floor(nouveauMinute / 60);
    nouvelleHeure += heuresSupplementaires;
    nouveauMinute %= 60;
  }

  // Formater la nouvelle heure et minute
  const nouvelleHeureFormattee = nouvelleHeure.toString().padStart(2, "0");
  const nouveauMinuteFormattee = nouveauMinute.toString().padStart(2, "0");

  // Renvoyer la nouvelle date au format "hh:mm"
  return `${nouvelleHeureFormattee}:${nouveauMinuteFormattee}`;
};

export const formatDataForConsignePicKlist = data => data?.map((c) =>({
      label: c?.label,
      value: c?._id
    }))