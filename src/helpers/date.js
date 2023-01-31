import months from './months';

const date = new Date();

function getDate() {
  return date.getDate();
}

function getMonth() {
  return months[date.getMonth()];
}

function getYear() {
  return date.getFullYear();
}

export { getDate, getMonth, getYear };
