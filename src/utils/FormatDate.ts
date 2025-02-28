import moment from 'moment';
import 'moment-timezone';

export default function formatDate(
  dateString?: string | Date,
  timezone: string = 'UTC',
): string {
  // Crear un objeto moment en UTC para la fecha dada y establecer la hora a medianoche
  const momentDate = moment.utc(dateString).startOf('day');

  // Convertir la fecha a la zona horaria especificada sin cambiar el día
  const dateInTimezone = momentDate.tz(timezone, true);

  // Formatear la fecha en el formato MES/DIA/AÑO
  return dateInTimezone.format('MM/DD/YYYY');
}