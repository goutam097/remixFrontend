import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datetimeago',
})
export class DatetimeagoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29)
        // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals: any = {
        hour: 3600,
        minute: 60,
        second: 1,
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular (1 day ago)
          } else {
            if (intervals[i] == 3600 && counter > 23 && counter < 48) {
              const time = moment(value).format('LT');
              return 'Yesterday at ' + time;
            } else if (intervals[i] == 3600 && counter > 48) {
              return moment(value).format('DD MMM, yyyy h:m A');
            } else {
              return counter + ' ' + i + 's ago'; // plural (2 days ago)
            }
          }
        }
      }
    }
    return value;
  }
}
