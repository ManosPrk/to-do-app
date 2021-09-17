import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDifference'
})
export class TimeDifferencePipe implements PipeTransform {

  transform(timestamp?: number): string {
    if (!timestamp) {
      return '';
    }
    const dateUpdated = new Date(timestamp);
    const timeNow = new Date();
    const diffInMilliSeconds = timeNow.getTime() - dateUpdated.getTime();
    const diffInSeconds = diffInMilliSeconds / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / (new Date(timeNow.getFullYear(), timeNow.getMonth() + 1, 0).getDate());
    const diffInYears = diffInMonths / 12;

    let diff: number | null;
    let unitToReturn: string;
    switch (true) {
      case diffInYears > 1:
        diff = diffInYears;
        unitToReturn = 'year';
        break;
      case diffInMonths > 1:
        diff = diffInMonths;
        unitToReturn = 'month';
        break;
      case diffInDays > 1:
        diff = diffInDays;
        unitToReturn = 'day';
        break;
      case diffInHours > 1:
        diff = diffInHours;
        unitToReturn = 'hour';
        break;
      case diffInMinutes > 1:
        diff = diffInMinutes;
        unitToReturn = 'minute';
        break;
      default:
        diff = null;
        unitToReturn = 'seconds';
    }

    if (diff !== null && diff > 2) {
      unitToReturn += 's';
    }

    return diff
      ? `${Math.round(diff)} ${unitToReturn} ago`
      : `a few ${unitToReturn} ago`;
  }
}
