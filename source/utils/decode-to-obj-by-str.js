import { toString } from 'ramda';
import numberToInteger from './number-to-integer';
import numberToDecimal from './number-to-decimal';
import matchDecimalLength from './match-decimal-length';

const decodeToObjByStr = (formatStr) => (number) => {
  const numberStr = toString(number);
  const origin = {
    number: numberStr,
    integer: numberToInteger(numberStr),
    decimal: numberToDecimal(numberStr)
  };

  return ({
    origin,
    /* 小數點位數 */
    decimalLength: matchDecimalLength(formatStr),
    /* r 四捨五入 */
    isRound: false,
    /* c 逗號 */
    isComma: false
  });
};

export default decodeToObjByStr;