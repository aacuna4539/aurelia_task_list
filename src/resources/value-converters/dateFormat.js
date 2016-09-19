import moment from 'moment';

export class DateFormatValueConverter {
    toView(value, format) {
        if(!format) {
          format = 'M/DD/YYYY h:mm a';
        }
        value = moment(value).format(format);
        return value;
    }

    fromView(value) {
        return new Date(value);
    }
}
