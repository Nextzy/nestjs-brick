import { format } from 'date-fns';

export class DateUtil {
  static formatDate(date: Date, formatString = 'yyyy-MM-dd HH:mm:ss'): string {
    return format(date, formatString);
  }
}
