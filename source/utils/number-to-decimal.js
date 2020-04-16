import { toString, slice } from 'ramda';

const numberToDecimal = numberStr => {
  if (isNaN(parseFloat(numberStr))) return '';

  const decimal = Math.abs(parseFloat(numberStr) - +numberStr).toFixed(
    numberStr.indexOf('.') > 0 ? parseFloat(numberStr.length - numberStr.indexOf('.') - 1) : 0
  );
  return slice(2, Infinity)(decimal);
};

export default numberToDecimal;