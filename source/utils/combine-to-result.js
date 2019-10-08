import { join, slice } from 'ramda';
import paddingRight from './padding-right';

const combineToResult = formatObject => {
  const {
    origin: { number, integer, decimal },
    /* 小數點位數 */
    decimalLength,
    /* r 四捨五入 */
    isRound,
    /* c 逗號 */
    isComma
  } = formatObject;

  const compileDecimal = decimalLength === Infinity ? decimal : decimalLength < decimal.length ? slice(
    0,
    decimalLength,
    decimal
  ) : paddingRight(decimalLength, decimal);

  return join('', [
    '',
    ...(decimal !== "" ? ['.'] : []),
    compileDecimal
  ]);

};

export default combineToResult;