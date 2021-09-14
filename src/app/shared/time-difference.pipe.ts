import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDifference'
})
export class TimeDifferencePipe implements PipeTransform {

  transform(timestamp: number): string {
    if (!timestamp) {
      return '';
    }
    const dateAdded = new Date(timestamp);
    const timeNow = new Date();
    const diffInYears = timeNow.getFullYear() - dateAdded.getFullYear();
    const diffInMonths = timeNow.getMonth() - dateAdded.getMonth();
    const diffInDays = timeNow.getDay() - dateAdded.getDay();
    const diffInHours = timeNow.getHours() - dateAdded.getHours();
    const diffInMinutes = timeNow.getMinutes() - dateAdded.getMinutes();

    let diff: number | null;
    let unitToReturn: string;

    switch (true) {
      case diffInYears > 0:
        diff = diffInYears;
        unitToReturn = 'year';
        break;
      case diffInMonths > 0:
        diff = diffInMonths;
        unitToReturn = 'month';
        break;
      case diffInDays > 0:
        diff = diffInDays;
        unitToReturn = 'day';
        break;
      case diffInHours > 0:
        diff = diffInHours;
        unitToReturn = 'hour';
        break;
      case diffInMinutes > 0:
        diff = diffInMinutes;
        unitToReturn = 'minute';
        break;
      default:
        diff = null;
        unitToReturn = 'seconds';
    }

    if (diff !== null && diff > 1) {
      unitToReturn += 's';
    }

    return diff
      ? `Added ${diff} ${unitToReturn} ago`
      : `Added a few ${unitToReturn} ago`;
  }
}
