import { curry, repeat, join } from 'ramda';

const paddingLeft = curry((length, numberStr) => {
  const numberLength = numberStr.length;
  if (numberLength >= length) return numberStr;

  return join('', repeat('0', length - numberLength)) + numberStr;
});

export default paddingLeft;