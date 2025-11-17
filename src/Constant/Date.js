import moment from 'moment';

export const today = moment().format('YYYY-MM-DD');
export const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
