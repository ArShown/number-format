import { curry, repeat, join } from 'ramda';

const paddingRight = curry((length, numberStr) => {
  const numberLength = numberStr.length;
  if (numberLength >= length) return numberStr;

  return numberStr + join('', repeat('0', length - numberLength));
});

export default paddingRight;