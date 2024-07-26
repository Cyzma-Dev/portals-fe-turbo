import { format, parse } from 'date-fns';
import moment from 'moment';

export const DateTimeFormat = {
  date: 'MM/dd/yyyy',
  yearToDate: 'yyyy-MM-dd',
  dateTime: 'MM/dd/yyyy  hh:mm a',
  time: 'hh:mm a',
  kendoDate: '{0:MM/dd/yyyy}',
  kendoDateTime: '{0:MM/dd/yyyy HH:mm}',
  momentDate: 'MM/dd/yyyy',
  momentDateTime: 'MM/DD/yyyy hh:mm a',
  newFormat: 'YYYY/MM/DD',
};

export class DateUtility {
  static dateToString = (date: Date, strFormat: string): string => {
    if (!date) return '';
    return format(new Date(date), strFormat);
  };
  static time = (time: string): string => {
    if (!time) return '';
    return moment(time, 'hh:mm A').format('hh:mm A');
  };
  static stringToDate = (date: string, strFormat: string = DateTimeFormat.date): Date | null => {
    if (!date) return null;
    return parse(date, strFormat, new Date());
  };
  //to convert date from 2022-03-02T00:00:00Z(UTC) to 03/02/2022 only date
  static getDateFromUTCDate = (date: Date, format?: string): string => {
    if (!format) return moment(date).utc().format(moment.HTML5_FMT.DATE);
    return moment(date).utc().format(format);
  };

  //to convert date time string 04/28/2022 08:30 to Thu Apr 28 2022 04:30:00 GMT-0400 (Eastern Daylight Time)
  static dateTimeStringToUtcDateTime = (selectedDateTime: string) => {
    const d = new Date(selectedDateTime);
    const utcDateTime = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), 0));
    return utcDateTime;
  };

  static convertUtcToEst = (utcDateTime: Date) => {
    return utcDateTime.toLocaleString('en-US', {
      timeZone: 'America/New_York',
    });
  };

  //to convert date 1995-07-24 to 07/24/1995
  static dateFormatter = (date: string) => {
    return moment(date).format('MM/DD/YYYY');
  };

  static dateTimeFormatter = (date: string) => {
    return moment(date).format('MM/DD/YYYY hh:mm A');
  };
  static dateToYear = (date: string) => {
    return moment(date).format('DD/MM/YYYY');
  };

  // to convert date from 2021-11-15T00:00:00Z to 11/15/2021
  static dateFromISOString = (date: string) => {
    return DateUtility.dateFormatter(date.split('T')[0]);
  };

  static dateTimeFromISOString = (date: Date) => {
    return moment(date).format('MM/DD/YYYY hh:mm A');
  };

  static getTodaysDate = () => {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const d = newDate.getDate();

    return `${month.toString().padStart(2, '0')}${d.toString().padStart(2, '0')}${year}`;
  };

  static getDateWithDayAndMonthName = (date: Date) => {
    return new Date(date).toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  static validString = (date: string): boolean => {
    return moment(date).isValid()
  }

  // * Convert Mon Sep 18 2023 05:30:00 GMT+0530 (India Standard Time) ==> 2023-9-18
  static getDateString = (date: Date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth() + 1;
    const day = date?.getDate()
    return `${year}-${month}-${day}`;
  }

  static isFifteenDaysDiff = (targetDate: string) => {
    const currdate = new Date();
    const date = new Date(targetDate);
    const difference = currdate.getTime() - date.getTime();
    const fifteenDaysInMilliseconds = 15 * 24 * 60 * 60 * 1000;
    return fifteenDaysInMilliseconds <= difference;
  }

  static getDateWithDayAndMonthNameAndYear = (date: Date) => {
    const currentDate = new Date(date);
    const UTCDay = currentDate.getUTCDay();
    const UTCMonth = currentDate.getUTCMonth();
    const UTCDate = currentDate.getUTCDate();
    const UTCYear = currentDate.getUTCFullYear();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const Months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June,',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return `${days[UTCDay]}, ${Months[UTCMonth]} ${UTCDate}, ${UTCYear}`;
  };
}
